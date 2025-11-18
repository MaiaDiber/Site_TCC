import conexao from './connection.js';

export async function inserirUnidadeSaude(unidade) {
  const comando = `
    INSERT INTO Unidades_saude (nome_unidade, endereco, telefone, id_admin)
    VALUES (?, ?, ?, ?)
  `;
  let [resposta] = await conexao.execute(comando, [
    unidade.nome_unidade,
    unidade.endereco,
    unidade.telefone,
    unidade.id_admin
  ]);
  return resposta.insertId;
}

export async function alterarUnidadeSaude(id, unidade) {
  const comando = `
    UPDATE Unidades_saude
    SET nome_unidade = ?, endereco = ?, telefone = ?, id_admin = ?
    WHERE id = ?
  `;
  let [resposta] = await conexao.execute(comando, [
    unidade.nome_unidade,
    unidade.endereco,
    unidade.telefone,
    unidade.id_admin,
    id
  ]);
  return resposta.affectedRows;
}

export async function deletarUnidadeSaude(id) {
  const comando = `DELETE FROM Unidades_saude WHERE id = ?`;
  let [resposta] = await conexao.execute(comando, [id]);
  return resposta.affectedRows;
}

export async function consultarUnidadeSaude(id) {
  const comando = `
    SELECT * FROM Unidades_saude
    WHERE id = ?
  `;
  let [resposta] = await conexao.execute(comando, [id]);
  return resposta[0];
}

export async function listarUnidadesSaude() {
  const comando = `SELECT * FROM Unidades_saude`;
  let [resposta] = await conexao.execute(comando);
  return resposta;
}

