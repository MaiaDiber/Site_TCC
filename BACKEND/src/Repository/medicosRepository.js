import conexao from "./connection.js";

export async function inserirMedico(medico) {
    let comando = `
        INSERT INTO Medicos (nome_medico, especialidade, horario_disponivel, id_unidade)
        VALUES (?, ?, ?, ?)
    `;

    let [resposta] = await conexao.execute(comando, [
        medico.nome_medico,
        medico.especialidade,
        medico.horario_disponivel,
        medico.id_unidade
    ]);
    return resposta.insertId;
}

export async function alterarMedico(id, medico) {
    let comando = `
        UPDATE Medicos
        SET nome_medico = ?, especialidade = ?, horario_disponivel = ?, id_unidade = ?
        WHERE id = ?
    `;

    let [resposta] = await conexao.execute(comando, [
        medico.nome_medico,
        medico.especialidade,
        medico.horario_disponivel,
        medico.id_unidade,
        id
    ]);

    return resposta.affectedRows;
}

export async function deletarMedico(id) {
    let comando = `DELETE FROM Medicos WHERE id = ?`;

    let [resposta] = await conexao.execute(comando, [id]);

    return resposta.affectedRows;
}

export async function consultarMedico(id) {
    let comando = `
        SELECT * FROM Medicos
        WHERE id = ?
    `;

    let [resposta] = await conexao.execute(comando, [id]);

    return resposta[0];
}

export async function listarMedicos() {
    let comando = `SELECT * FROM Medicos`;

    let [resposta] = await conexao.execute(comando);

    return resposta;
}
