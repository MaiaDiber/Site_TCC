import fs from 'fs';
import csv from 'csv-parser';
import conexao from '../Repository/connection.js';


function formatarDataParaSQL(data) {
  if (!data || data === '' || data === 'NULL' || data === 'null') {
    return null;
  }
  
  const dataStr = data.toString().trim();
  
  
  if (/^\d{4}-\d{2}-\d{2}$/.test(dataStr)) {
    return dataStr;
  }
  
  
  if (dataStr.includes('/')) {
    const partes = dataStr.split('/');
    if (partes.length === 3) {
      const [dia, mes, ano] = partes.map(part => part.trim().padStart(2, '0'));
      if (ano && mes && dia && ano.length === 4) {
        return `${ano}-${mes}-${dia}`;
      }
    }
  }
  
  return null;
}


function validadeAcimaDe2026(dataValidade) {
  if (!dataValidade) return false;
  
  const anoValidade = parseInt(dataValidade.split('-')[0]);
  return anoValidade >= 2026;
}


function gerarDataRegistro(dataValidade) {
  if (!dataValidade) return '2023-01-01'; 
  
  const dataVal = new Date(dataValidade);
  
  const anosAtras = Math.floor(Math.random() * 2) + 1; 
  dataVal.setFullYear(dataVal.getFullYear() - anosAtras);
  
  return dataVal.toISOString().split('T')[0];
}


function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


function limparTexto(texto) {
  if (!texto) return '';
  return texto.toString().trim().replace(/^"|"$/g, '');
}


let linhasProcessadas = 0;

export async function importarMedicamentosCSV(caminhoArquivo) {
  console.log("🚀 INICIANDO IMPORTAÇÃO - FILTRANDO VALIDADE > 2026...");
  
  
  if (!fs.existsSync(caminhoArquivo)) {
    throw new Error(`❌ Arquivo não encontrado: ${caminhoArquivo}`);
  }
  
  console.log(`📁 Arquivo encontrado: ${caminhoArquivo}`);

  const medicamentosValidos = [];
  linhasProcessadas = 0;
  let medicamentosFiltrados = 0;

  
  console.log("📥 Lendo e processando arquivo CSV...");
  
  await new Promise((resolve, reject) => {
    fs.createReadStream(caminhoArquivo)
      .pipe(csv({ 
        separator: ';',
        mapHeaders: ({ header }) => header.trim()
      }))
      .on('data', (data) => {
        linhasProcessadas++;
        
        try {
          
          const nomeProduto = limparTexto(data["NOME_PRODUTO"] || "");
          const numeroRegistro = limparTexto(data["NUMERO_REGISTRO_PRODUTO"] || "");
          const razaoSocial = limparTexto(data["EMPRESA_DETENTORA_REGISTRO"] || "");
          const cnpj = limparTexto(data["CNPJ_EMPRESA"] || "");
          const situacao = limparTexto(data["SITUACAO_REGISTRO"] || "VÁLIDO");
          
          
          const dataValidadeBruta = data["DATA_VENCIMENTO_REGISTRO"] || 
                                   data["DATA VENCIMENTO REGISTRO"] || 
                                   data["VALIDADE"] || 
                                   data["DATA_VALIDADE"] ||
                                   data["DATA VALIDADE"] ||
                                   "";
          const dataValidade = formatarDataParaSQL(dataValidadeBruta);
          
          
          if (!validadeAcimaDe2026(dataValidade)) {
            medicamentosFiltrados++;
            return;
          }
          
          
          const dataRegistro = gerarDataRegistro(dataValidade);

          
          if (!nomeProduto || nomeProduto === '') {
            return;
          }
          
          medicamentosValidos.push({
            nome_produto: nomeProduto,
            numero_registro: numeroRegistro || `REG-${linhasProcessadas}`,
            razao_social: razaoSocial || "EMPRESA NÃO INFORMADA",
            cnpj: cnpj || null,
            data_registro: dataRegistro,      
            data_validade: dataValidade,      
            situacao: situacao
          });

          
          if (linhasProcessadas % 5000 === 0) {
            console.log(`📊 ${linhasProcessadas} linhas processadas...`);
          }
        } catch (err) {
          console.error(`⚠️ Erro na linha ${linhasProcessadas}:`, err.message);
        }
      })
      .on('end', () => {
        console.log(`✅ Leitura CSV concluída!`);
        console.log(`📈 Linhas totais: ${linhasProcessadas}`);
        console.log(`💊 Medicamentos válidos (validade >= 2026): ${medicamentosValidos.length}`);
        console.log(`🚫 Medicamentos filtrados (validade < 2026): ${medicamentosFiltrados}`);
        resolve();
      })
      .on('error', (err) => {
        console.error('❌ Erro ao ler CSV:', err);
        reject(err);
      });
  });

  if (medicamentosValidos.length === 0) {
    return "❌ Nenhum medicamento com validade >= 2026 encontrado.";
  }

  
  console.log("\n🗃 INICIANDO IMPORTAÇÃO PARA O BANCO...");

  
  const [ubs] = await conexao.execute('SELECT id, nome_unidade FROM Unidades_saude');
  console.log(`🏥 ${ubs.length} UBS encontradas para distribuição`);

  if (ubs.length === 0) {
    throw new Error("❌ Nenhuma UBS cadastrada no sistema!");
  }

  
  console.log("🧹 Limpando medicamentos com validade vencida...");
  await conexao.execute('DELETE FROM Medicamentos WHERE data_validade IS NULL OR data_validade < CURDATE()');

  let medicamentosImportados = 0;
  let erros = 0;

  
  console.log(`🎯 Importando ${medicamentosValidos.length} medicamentos com validade >= 2026...`);

  for (const [index, med] of medicamentosValidos.entries()) {
    try {
      
      const [existentes] = await conexao.execute(
        'SELECT id FROM Medicamentos WHERE nome_produto = ?',
        [med.nome_produto]
      );

      let idMedicamento;

      if (existentes.length > 0) {
        
        idMedicamento = existentes[0].id;
        await conexao.execute(
          'UPDATE Medicamentos SET data_registro = ?, data_validade = ? WHERE id = ?',
          [med.data_registro, med.data_validade, idMedicamento]
        );
        console.log(`♻️ Atualizado: ${med.nome_produto}`);
      } else {
        
        const [result] = await conexao.execute(
          `INSERT INTO Medicamentos 
           (nome_produto, estoque_produto, numero_registro, cnpj, razao_social, data_registro, data_validade, situacao, id_admin) 
           VALUES (?, 0, ?, ?, ?, ?, ?, ?, 1)`,
          [
            med.nome_produto,
            med.numero_registro,
            med.cnpj,
            med.razao_social,
            med.data_registro,    
            med.data_validade,    
            med.situacao
          ]
        );
        idMedicamento = result.insertId;
        console.log(`✅ ${index + 1}. ${med.nome_produto}`);
      }

      
      if (existentes.length === 0) {
        let estoqueTotal = 0;
        for (const ubsItem of ubs) {
          const quantidade = randomInt(20, 80);
          await conexao.execute(
            'INSERT INTO Estoques (id_medicamento, id_unidade, quantidade) VALUES (?, ?, ?)',
            [idMedicamento, ubsItem.id, quantidade]
          );
          estoqueTotal += quantidade;
        }

        await conexao.execute(
          'UPDATE Medicamentos SET estoque_produto = ? WHERE id = ?',
          [estoqueTotal, idMedicamento]
        );
      }

      medicamentosImportados++;

      
      if (medicamentosImportados % 10 === 0) {
        console.log(`   📋 Registro: ${med.data_registro} | 📅 Validade: ${med.data_validade}`);
      }

    } catch (error) {
      erros++;
      console.error(`❌ Erro ao importar ${med.nome_produto}:`, error.message);
    }
  }

  
  console.log("\n📊 RELATÓRIO FINAL");
  console.log(`🎯 Medicamentos importados (validade >= 2026): ${medicamentosImportados}`);
  console.log(`❌ Erros: ${erros}`);
  
  
  const [totalMedicamentos] = await conexao.execute('SELECT COUNT(*) as total FROM Medicamentos');
  const [validadeFutura] = await conexao.execute(
    'SELECT COUNT(*) as total FROM Medicamentos WHERE data_validade >= "2026-01-01"'
  );
  
  
  const [exemploDatas] = await conexao.execute(
    'SELECT nome_produto, data_registro, data_validade FROM Medicamentos WHERE data_validade >= "2026-01-01" LIMIT 10'
  );
  
  console.log(`\n🗃 ESTADO DO BANCO:`);
  console.log(`   💊 Total de medicamentos: ${totalMedicamentos[0].total}`);
  console.log(`   📅 Com validade >= 2026: ${validadeFutura[0].total}`);
  
  console.log(`\n📋 EXEMPLO DE MEDICAMENTOS COM VALIDADE >= 2026:`);
  exemploDatas.forEach(med => {
    console.log(`   💊 ${med.nome_produto}`);
    console.log(`      📋 Registro: ${med.data_registro}`);
    console.log(`      📅 Validade: ${med.data_validade}`);
  });
  
  return {
    mensagem: "Importação concluída! Apenas medicamentos com validade >= 2026.",
    estatisticas: {
      medicamentos_importados: medicamentosImportados,
      erros: erros,
      com_validade_2026: validadeFutura[0].total
    }
  };
}




