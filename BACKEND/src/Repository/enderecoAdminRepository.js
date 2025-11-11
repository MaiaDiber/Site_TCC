import conexao from "./connection.js";

export async function inserirEnderecoAdmin(endereco) {
    let comando = `
        INSERT INTO Endereco_admin (cep, rua_aven, numero_casa, bairro, id_admin)
        VALUES (?, ?, ?, ?, ?)
    `;

    let [resposta] = await conexao.execute(comando, [
        endereco.cep,
        endereco.rua_aven,
        endereco.numero_casa,
        endereco.bairro,
        endereco.id_admin
    ]);
    return resposta.insertId;
}

export async function alterarEnderecoAdmin(id, endereco) {
    let comando = `
        UPDATE Endereco_admin
        SET cep = ?, rua_aven = ?, numero_casa = ?, bairro = ?, id_admin = ?
        WHERE id = ?
    `;

    let [resposta] = await conexao.execute(comando, [
        endereco.cep,
        endereco.rua_aven,
        endereco.numero_casa,
        endereco.bairro,
        endereco.id_admin,
        id
    ]);

    return resposta.affectedRows;
}

export async function deletarEnderecoAdmin(id) {
    let comando = `DELETE FROM Endereco_admin WHERE id = ?`;

    let [resposta] = await conexao.execute(comando, [id]);

    return resposta.affectedRows;
}

export async function consultarEnderecoAdmin(id) {
    let comando = `
        SELECT * FROM Endereco_admin
        WHERE id = ?
    `;

    let [resposta] = await conexao.execute(comando, [id]);

    return resposta[0];
}

export async function listarEnderecosAdmin() {
    let comando = `SELECT * FROM Endereco_admin`;

    let [resposta] = await conexao.execute(comando);

    return resposta;
}
