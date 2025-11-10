import conexao from "./connection.js";

export async function inserirEstoque(estoque) {
    let comando = `
        INSERT INTO Estoques (id_medicamento, id_unidade, quantidade)
        VALUES (?, ?, ?)
    `;

    let [resposta] = await conexao.execute(comando, [
        estoque.id_medicamento,
        estoque.id_unidade,
        estoque.quantidade
    ]);
    return resposta.insertId;
}

export async function alterarEstoque(id, estoque) {
    let comando = `
        UPDATE Estoques
        SET id_medicamento = ?, id_unidade = ?, quantidade = ?
        WHERE id = ?
    `;

    let [resposta] = await conexao.execute(comando, [
        estoque.id_medicamento,
        estoque.id_unidade,
        estoque.quantidade,
        id
    ]);

    return resposta.affectedRows;
}

export async function deletarEstoque(id) {
    let comando = `DELETE FROM Estoques WHERE id = ?`;

    let [resposta] = await conexao.execute(comando, [id]);

    return resposta.affectedRows;
}

export async function consultarEstoque(id) {
    let comando = `
        SELECT * FROM Estoques
        WHERE id = ?
    `;

    let [resposta] = await conexao.execute(comando, [id]);

    return resposta[0];
}

export async function listarEstoques() {
    let comando = `SELECT * FROM Estoques`;

    let [resposta] = await conexao.execute(comando);

    return resposta;
}
