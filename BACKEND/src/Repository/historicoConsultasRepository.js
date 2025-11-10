import conexao from "./connection.js";

export async function inserirHistoricoConsulta(historico) {
    let comando = `
        INSERT INTO Historico_consultas (id_consulta, data_consulta, hora_consulta, status_final, observacoes)
        VALUES (?, ?, ?, ?, ?)
    `;

    let [resposta] = await conexao.execute(comando, [
        historico.id_consulta,
        historico.data_consulta,
        historico.hora_consulta,
        historico.status_final,
        historico.observacoes
    ]);
    return resposta.insertId;
}

export async function alterarHistoricoConsulta(id, historico) {
    let comando = `
        UPDATE Historico_consultas
        SET id_consulta = ?, data_consulta = ?, hora_consulta = ?, status_final = ?, observacoes = ?
        WHERE id = ?
    `;

    let [resposta] = await conexao.execute(comando, [
        historico.id_consulta,
        historico.data_consulta,
        historico.hora_consulta,
        historico.status_final,
        historico.observacoes,
        id
    ]);

    return resposta.affectedRows;
}

export async function deletarHistoricoConsulta(id) {
    let comando = `DELETE FROM Historico_consultas WHERE id = ?`;

    let [resposta] = await conexao.execute(comando, [id]);

    return resposta.affectedRows;
}

export async function consultarHistoricoConsulta(id) {
    let comando = `
        SELECT * FROM Historico_consultas
        WHERE id = ?
    `;

    let [resposta] = await conexao.execute(comando, [id]);

    return resposta[0];
}

export async function listarHistoricoConsultas() {
    let comando = `SELECT * FROM Historico_consultas`;

    let [resposta] = await conexao.execute(comando);

    return resposta;
}
