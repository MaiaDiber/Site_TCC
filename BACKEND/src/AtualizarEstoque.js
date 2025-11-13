import fs from 'fs';
import csv from 'csv-parser';
import conexao from './connection.js';

async function atualizarEstoque() {
  const medicamentos = [];
  console.log(' 📦 Lendo CSV e preparando atualização...');

  fs.createReadStream('DADOS_ABERTOS_MEDICAMENTOS.csv')
    .pipe(csv({ separator: ';' }))
    .on('data', (data) => {
      try {
        
        const rawValidade = data['DATA_VENCIMENTO_REGISTRO'] || data['5'] || '';
        let anoValidade = null;
        if (rawValidade) {
          const parts = rawValidade.split('/').map(p => p.trim());
          if (parts.length === 3) anoValidade = parseInt(parts[2], 10);
          else if (rawValidade.includes('-')) anoValidade = parseInt(rawValidade.split('-')[0], 10);
        }
        if (anoValidade && anoValidade >= 2026) {
          medicamentos.push({
            nome: (data['NOME_PRODUTO'] || data['1'] || '').trim().replace(/^"|"$/g,''),
            estoque: parseInt(data['ESTOQUE'] || data['estoque'] || 0, 10) || 0,
            data_validade: rawValidade
          });
        }
      } catch (err) {
        console.error('Erro ao processar linha:', err.message);
      }
    })
    .on('end', async () => {
      for (const med of medicamentos) {
        try {
          await conexao.query(
            'UPDATE Medicamentos SET estoque_produto = ?, data_registro = ? WHERE nome_produto = ?',
            [med.estoque, med.data_validade, med.nome]
          );
        } catch (err) {
          console.error('Erro ao atualizar banco:', err.message);
        }
      }
      console.log(`✅ ${medicamentos.length} medicamentos atualizados com sucesso!`);
      process.exit(0);
    })
    .on('error', (err) => {
      console.error('Erro ao ler CSV:', err.message);
      process.exit(1);
    });
}

atualizarEstoque();
