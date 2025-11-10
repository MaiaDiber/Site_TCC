import conexao from "./connection.js";

export async function inserirAdmin(admin) {
    let comando = `
        INSERT INTO Cadastrar_admin (nome_completo, cpf, data_nascimento, senha, email)
        VALUES (?, ?, ?, ?, ?)
    `;

    let [resposta] = await conexao.execute(comando, [
        admin.nome_completo,
        admin.cpf,
        admin.data_nascimento,
        admin.senha,
        admin.email
    ]);
    return resposta.insertId;
}

export async function alterarAdmin(id, admin) {
    let comando = `
        UPDATE Cadastrar_admin
        SET nome_completo = ?, cpf = ?, data_nascimento = ?, senha = MD5(?), email = ?
        WHERE id = ?
    `;

    let [resposta] = await conexao.execute(comando, [
        admin.nome_completo,
        admin.cpf,
        admin.data_nascimento,
        admin.senha,
        admin.email,
        id
    ]);

    return resposta.affectedRows;
}

export async function deletarAdmin(id) {
    let comando = `DELETE FROM Cadastrar_admin WHERE id = ?`;

    let [resposta] = await conexao.execute(comando, [id]);

    return resposta.affectedRows;
}

export async function consultarAdmin(id) {
    let comando = `
        SELECT * FROM Cadastrar_admin
        WHERE id = ?
    `;

    let [resposta] = await conexao.execute(comando, [id]);

    return resposta[0];
}

export async function listarAdmins() {
    let comando = `SELECT * FROM Cadastrar_admin`;

    let [resposta] = await conexao.execute(comando);

    return resposta;
}

export async function verificarLoginAdmin(email, senha) {
    let comando = `
        SELECT id, nome_completo, email FROM Cadastrar_admin
        WHERE email = ? AND senha = MD5(?)
    `;

    let [resposta] = await conexao.execute(comando, [email, senha]);

    return resposta[0];
}
