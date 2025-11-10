import conexao from "./connection.js";

export async function inserirCadastro(cadastro) {
    let comando = `
        INSERT INTO Cadastrar (nome_completo, cpf, data_nascimento, senha, email)
        VALUES (?, ?, ?, ?, ?)

    `;

    let [resposta] = await conexao.execute(comando, [
        cadastro.nome_completo,
        cadastro.cpf,
        cadastro.data_nascimento,
        cadastro.senha,
        cadastro.email
    ]);
    return resposta.insertId;
}


export async function alterarCadastro(id, cadastro) {
    let comando = `
        UPDATE Cadastrar
        SET nome_completo = ?, cpf = ?, data_nascimento = ?, senha = MD5(?), email = ?
        WHERE id = ?
    `;

    let [resposta] = await conexao.execute(comando, [
        cadastro.nome_completo,
        cadastro.cpf,
        cadastro.data_nascimento,
        cadastro.senha,
        cadastro.email,
        id
    ]);

    return resposta.affectedRows;
}

export async function deletarCadastro(id) {
    let comando = `DELETE FROM Cadastrar WHERE id = ?`;

    let [resposta] = await conexao.execute(comando, [id]);

    return resposta.affectedRows;
}

export async function consultarCadastro(id) {
    let comando = `
                SELECT * FROM Cadastrar
                WHERE id = ?`;

    let [resposta] = await conexao.execute(comando, [id]);

    return resposta[0];
}

export async function listarCadastros() {
    let comando = `SELECT * FROM Cadastrar`;

    let [resposta] = await conexao.execute(comando);

    return resposta;
}

export async function verificarLogin(email, senha) {
    let comando = `
                    SELECT id, nome_completo, email FROM Cadastrar
                    WHERE email = ? AND senha = MD5(?)`;

    let [resposta] = await conexao.execute(comando, [email, senha]);

    return resposta[0];
}
