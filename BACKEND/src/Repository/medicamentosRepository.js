import conexao from './connection.js';

export async function inserirMedicamento(medicamento) {
  const comando = `
    INSERT INTO Medicamentos (nome_produto, estoque_produto, numero_registro, cnpj, razao_social, data_registro, situacao, id_admin)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  let [resposta] = await conexao.execute(comando, [
    medicamento.nome_produto,
    medicamento.estoque_produto,
    medicamento.numero_registro,
    medicamento.cnpj,
    medicamento.razao_social,
    medicamento.data_registro,
    medicamento.situacao,
    medicamento.id_admin
  ]);
  return resposta.insertId;
}

export async function alterarMedicamento(id, medicamento) {
  const comando = `
    UPDATE Medicamentos
    SET nome_produto = ?, estoque_produto = ?, numero_registro = ?, cnpj = ?, razao_social = ?, data_registro = ?, situacao = ?, id_admin = ?
    WHERE id = ?
  `;

  let [resposta] = await conexao.execute(comando, [
    medicamento.nome_produto,
    medicamento.estoque_produto,
    medicamento.numero_registro,
    medicamento.cnpj,
    medicamento.razao_social,
    medicamento.data_registro,
    medicamento.situacao,
    medicamento.id_admin,
    id
  ]);

  return resposta.affectedRows;
}

export async function deletarMedicamento(id) {
  const comando = `DELETE FROM Medicamentos WHERE id = ?`;
  let [resposta] = await conexao.execute(comando, [id]);
  return resposta.affectedRows;
}

export async function consultarMedicamento(id) {
  const comando = `
    SELECT * FROM Medicamentos
    WHERE id = ?
  `;
  let [resposta] = await conexao.execute(comando, [id]);
  return resposta[0];
}


export async function listarMedicamentos() {
  const comando = `
    SELECT 
        m.id,
        m.nome_produto,
        m.data_registro,
        m.data_validade,  -- ← GARANTIR que está incluindo data_validade
        m.situacao,
        m.estoque_produto,
        m.numero_registro,
        m.razao_social,
        m.cnpj,

        u.id AS id_unidade,
        u.nome_unidade,
        u.endereco,
        u.telefone,

        e.quantidade

    FROM Medicamentos m
    LEFT JOIN Estoques e ON e.id_medicamento = m.id
    LEFT JOIN Unidades_saude u ON u.id = e.id_unidade
    WHERE m.estoque_produto > 0
    ORDER BY m.nome_produto;
  `;

  try {
    console.log('🔍 Executando query listarMedicamentos...');
    const [linhas] = await conexao.execute(comando);

    if (!linhas || linhas.length === 0) {
      console.log('⚠️ Nenhum medicamento encontrado');
      return [];
    }

    console.log(`📊 ${linhas.length} registros encontrados`);

    const medicamentosMap = {};

    for (let item of linhas) {
      if (!medicamentosMap[item.id]) {
        medicamentosMap[item.id] = {
          id: item.id,
          nome_produto: item.nome_produto,
          data_registro: item.data_registro,
          data_validade: item.data_validade,  
          situacao: item.situacao,
          estoque_total: item.estoque_produto,
          numero_registro: item.numero_registro,
          razao_social: item.razao_social,
          cnpj: item.cnpj,
          unidades: []
        };
        
        
        console.log(`💊 ${item.nome_produto} - Registro: ${item.data_registro} - Validade: ${item.data_validade}`);
      }

      if (item.id_unidade && item.quantidade > 0) {
        medicamentosMap[item.id].unidades.push({
          id_unidade: item.id_unidade,
          nome_unidade: item.nome_unidade,
          endereco: item.endereco,
          telefone: item.telefone,
          estoque: item.quantidade
        });
      }
    }

    const resultado = Object.values(medicamentosMap);
    console.log(`🎯 ${resultado.length} medicamentos processados`);
    return resultado;

  } catch (error) {
    console.error('❌ Erro no repository listarMedicamentos:', error);
    throw error;
  }
}

export async function listarMedicamentosDisponiveis() {
  const comando = `
    SELECT 
      m.*,
      COALESCE(SUM(e.quantidade), 0) AS estoque
    FROM Medicamentos m
    LEFT JOIN Estoques e ON e.id_medicamento = m.id
    GROUP BY m.id
    HAVING estoque > 0
  `;

  const [resposta] = await conexao.execute(comando);
  return resposta;
}


export async function verificarExistenciaMedicamentos() {
  const comando = `SELECT COUNT(*) as total FROM Medicamentos WHERE estoque_produto > 0`;
  const [resultado] = await conexao.execute(comando);
  return resultado[0].total > 0;
}


export async function listarTodosMedicamentos() {
  const comando = `
    SELECT 
      id,
      nome_produto,
      estoque_produto,
      numero_registro,
      data_registro,
      situacao
    FROM Medicamentos 
    ORDER BY nome_produto
  `;
  
  const [resposta] = await conexao.execute(comando);
  return resposta;
}
