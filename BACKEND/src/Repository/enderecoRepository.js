import conexao from "./connection.js";

export async function inserirEndereco(endereco) {
    let comando = `
        INSERT INTO Endereco (cep, rua_aven, numero_casa, bairro)
        VALUES (?, ?, ?, ?)
    `;

    let [resposta] = await conexao.execute(comando, [
        endereco.cep,
        endereco.rua_aven,
        endereco.numero_casa,
        endereco.bairro
    ]);

    return resposta.insertId;
}

export async function alterarEndereco(id, endereco) {
    let comando = `
        UPDATE Endereco
        SET cep = ?, rua_aven = ?, numero_casa = ?, bairro = ?
        WHERE id = ?
    `;

    let [resposta] = await conexao.execute(comando, [
        endereco.cep,
        endereco.rua_aven,
        endereco.numero_casa,
        endereco.bairro,
        id
    ]);

    return resposta.affectedRows;
}

export async function deletarEndereco(id) {
    let comando = `DELETE FROM Endereco WHERE id = ?`;

    let [resposta] = await conexao.execute(comando, [id]);

    return resposta.affectedRows;
}

export async function consultarEndereco(id) {
    let comando = `SELECT * FROM Endereco WHERE id = ?`;

    let [resposta] = await conexao.execute(comando, [id]);

    return resposta[0];
}

export async function listarEnderecos() {
    let comando = `SELECT * FROM Endereco`;

    let [resposta] = await conexao.execute(comando);

    return resposta;
}
