import conexao from "./connection.js";

export async function inserirCampanha(campanha) {
    let comando = `
        INSERT INTO Campanhas (imagem, nome_campanha, como_prevenir, descricao)
        VALUES (?, ?, ?, ?)
    `;

    let [resposta] = await conexao.execute(comando, [
        campanha.imagem,
        campanha.nome_campanha,
        campanha.como_prevenir,
        campanha.descricao
    ]);

    return resposta.insertId;
}

export async function alterarCampanha(id, campanha) {
    let comando = `
        UPDATE Campanhas
        SET imagem = ?, nome_campanha = ?, como_prevenir = ?, descricao = ?
        WHERE id = ?
    `;

    let [resposta] = await conexao.execute(comando, [
        campanha.imagem,
        campanha.nome_campanha,
        campanha.como_prevenir,
        campanha.descricao,
        id
    ]);

    return resposta.affectedRows;
}

export async function deletarCampanha(id) {
    let comando = `DELETE FROM Campanhas WHERE id = ?`;

    let [resposta] = await conexao.execute(comando, [id]);

    return resposta.affectedRows;
}

export async function consultarCampanha(id) {
    let comando = `SELECT * FROM Campanhas WHERE id = ?`;

    let [resposta] = await conexao.execute(comando, [id]);

    return resposta[0];
}

export async function listarCampanhas() {
    let comando = `SELECT * FROM Campanhas`;

    let [resposta] = await conexao.execute(comando);

    return resposta;
}
