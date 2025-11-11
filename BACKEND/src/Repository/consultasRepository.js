import conexao from "./connection.js";

export async function inserirConsulta(consulta) {
    let comando = `
        INSERT INTO Consultas (id_paciente, id_medico, data_consulta, hora_consulta, status)
        VALUES (?, ?, ?, ?, ?)
    `;

    let [resposta] = await conexao.execute(comando, [
        consulta.id_paciente,
        consulta.id_medico,
        consulta.data_consulta,
        consulta.hora_consulta,
        consulta.status || 'agendada'
    ]);
    return resposta.insertId;
}

export async function alterarConsulta(id, consulta) {
    let comando = `
        UPDATE Consultas
        SET id_paciente = ?, id_medico = ?, data_consulta = ?, hora_consulta = ?, status = ?
        WHERE id = ?
    `;

    let [resposta] = await conexao.execute(comando, [
        consulta.id_paciente,
        consulta.id_medico,
        consulta.data_consulta,
        consulta.hora_consulta,
        consulta.status,
        id
    ]);

    return resposta.affectedRows;
}

export async function deletarConsulta(id) {
    let comando = `DELETE FROM Consultas WHERE id = ?`;

    let [resposta] = await conexao.execute(comando, [id]);

    return resposta.affectedRows;
}

export async function consultarConsulta(id) {
    let comando = `
        SELECT * FROM Consultas
        WHERE id = ?
    `;

    let [resposta] = await conexao.execute(comando, [id]);

    return resposta[0];
}

export async function listarConsultas() {
    let comando = `SELECT * FROM Consultas`;

    let [resposta] = await conexao.execute(comando);

    return resposta;
}
