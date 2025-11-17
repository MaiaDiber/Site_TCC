import fs from 'fs';
import csv from 'csv-parser';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import conexao from '../Repository/connection.js';

dotenv.config();

function formatarDataParaSQL(data) {
  if (!data) return null;
  
  const s = data.toString().trim();
  if (s.includes('/')) {
    const parts = s.split('/');
    if (parts.length !== 3) return null;
    const [dia, mes, ano] = parts.map(p => p.trim());
    return `${ano.padStart(4, '0')}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`;
  }
  
  return s;
}

export async function importarMedicamentosCSV(caminhoArquivo) {
  console.log("📥 Iniciando leitura do arquivo CSV...");
  console.log(`📂 Caminho: ${caminhoArquivo}`);

  const resultados = [];

  return new Promise((resolve, reject) => {
    if (!fs.existsSync(caminhoArquivo)) {
      return reject(new Error('Arquivo CSV não encontrado'));
    }

    fs.createReadStream(caminhoArquivo)
      .pipe(csv({ separator: ';', mapHeaders: ({ header }) => header }))
      .on('data', (data) => {
        try {
        
          const validadeBruta =
            data['DATA_VENCIMENTO_REGISTRO'] ||
            data['DATA_VENCIMENTO_REGISTRO '] ||
            data[' DATA_VENCIMENTO_REGISTRO'] ||
            data['5'] ||
            null;

          let validadeISO = null;
          if (validadeBruta && validadeBruta.includes("/")) {
            const [dia, mes, ano] = validadeBruta.split("/").map(s => s.trim());
            validadeISO = `${ano}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`;
          }

        
          if (validadeISO) {
            const anoValidade = parseInt(validadeISO.split("-")[0], 10);
            if (anoValidade >= 2026) {
              resultados.push({
                nome_produto: (data['NOME_PRODUTO'] || data[' NOME_PRODUTO'] || data['1'] || '')
                  .toString().trim().replace(/^"|"$/g, ''),
                numero_registro: (data['NUMERO_REGISTRO_PRODUTO'] || data['4'] || '')
                  .toString().trim().replace(/^"|"$/g, ''),
                razao_social: (data['EMPRESA_DETENTORA_REGISTRO'] || data['8'] || '')
                  .toString().trim().replace(/^"|"$/g, ''),
                data_registro: (data['DATA_FINALIZACAO_PROCESSO'] || data['2'] || null),
                situacao: (data['SITUACAO_REGISTRO'] || data['9'] || '')
                  .toString().trim().replace(/^"|"$/g, ''),
                validade: validadeISO
              });
            }
          }
        } catch (err) {
          console.error("⚠️ Erro ao processar linha:", err.message);
        }
      })
      .on('end', async () => {
        console.log(`✅ ${resultados.length} medicamentos válidos (ano ≥ 2026) encontrados.`);

        if (resultados.length === 0) {
          console.log("⚠️ Nenhum medicamento válido foi encontrado no CSV.");
          resolve("Nenhum medicamento válido para importar.");
          return;
        }

        try {
          let importados = 0;
          for (const med of resultados) {
            try {
              await conexao.execute(
                `
                  INSERT INTO Medicamentos
                  (nome_produto, numero_registro, razao_social, data_registro, situacao, id_admin)
                  VALUES (?, ?, ?, ?, ?, 1)
                `,
                [
                  med.nome_produto || null,
                  med.numero_registro || null,
                  med.razao_social || null,
                  med.data_registro ? formatarDataParaSQL(med.data_registro) : null,
                  med.situacao || null,
                ]
              );
              importados++;
            } catch (err) {
              console.error("❌ Erro ao inserir no banco:", err.message);
            }
          }

          console.log("🎯 Importação concluída com sucesso!");
          resolve(`Importação concluída com sucesso! ${importados} registros inseridos.`);
        } catch (err) {
          console.error(err);
          reject(err);
        }
      })
      .on('error', (err) => reject(err));
  });
}


if (process.argv[1].includes('importarMedicamentos.js')) {
  importarMedicamentosCSV(process.env.CSV_PATH)
    .then((msg) => console.log(`✅ ${msg}`))
    .catch((err) => console.error("❌ Erro ao importar CSV:", err.message));
}
