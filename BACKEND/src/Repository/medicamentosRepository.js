import conexao from "./connection.js";

export async function inserirMedicamento(medicamento) {
    let comando = `
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
    let comando = `
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
    let comando = `DELETE FROM Medicamentos WHERE id = ?`;

    let [resposta] = await conexao.execute(comando, [id]);

    return resposta.affectedRows;
}

export async function consultarMedicamento(id) {
    let comando = `
        SELECT * FROM Medicamentos
        WHERE id = ?
    `;

    let [resposta] = await conexao.execute(comando, [id]);

    return resposta[0];
}

export async function listarMedicamentos() {
    let comando = `SELECT * FROM Medicamentos`;

    let [resposta] = await conexao.execute(comando);

    return resposta;
}
