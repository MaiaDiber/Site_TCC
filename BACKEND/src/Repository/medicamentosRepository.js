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
  const comando = `SELECT * FROM Medicamentos`;
  let [resposta] = await conexao.execute(comando);
  return resposta;
}

export async function listarMedicamentosDisponiveis() {
  const comando = `
    SELECT *
    FROM Medicamentos
    WHERE estoque_produto > 0
      AND (YEAR(data_registro) >= 2026 OR data_registro IS NULL)
      AND situacao = 'Ativo'
    ORDER BY nome_produto ASC
  `;
  const [resposta] = await conexao.execute(comando);
  return resposta;
}
