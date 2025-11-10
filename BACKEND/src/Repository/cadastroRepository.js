import conexao from "./connection.js";

export async function inserirCadastro(cadastro) {
    const conn = await conexao.getConnection();
    await conn.beginTransaction();

    let comandoCadastro = `
        INSERT INTO Cadastrar
        (nome_completo, cpf, data_nascimento, senha, email, tipo, status_admin)
        VALUES (?, ?, ?, MD5(?), ?, ?, ?)
    `;

    const [resposta] = await conn.query(comandoCadastro, [
        cadastro.nome_completo,
        cadastro.cpf,
        cadastro.data_nascimento,
        cadastro.senha,
        cadastro.email,
        cadastro.tipo || 'paciente',
        cadastro.status_admin || 'aprovado'
    ]);

    const idNovoUsuario = resposta.insertId;

    let comandoEndereco = `
        INSERT INTO Endereco (cep, rua_aven, numero_casa, bairro, id_cadastro)
        VALUES (?, ?, ?, ?, ?)
    `;

    await conn.query(comandoEndereco, [
        cadastro.cep,
        cadastro.rua_aven,
        cadastro.numero_casa,
        cadastro.bairro,
        idNovoUsuario
    ]);

    await conn.commit();
    conn.release();
    return idNovoUsuario;
}

export async function alterarCadastro(id, cadastro) {
    const comando = `
        UPDATE Cadastrar
        SET nome_completo = ?,
            cpf = ?,
            data_nascimento = ?,
            email = ?
        WHERE id = ?
    `;

    const [resposta] = await conexao.query(comando, [
        cadastro.nome_completo,
        cadastro.cpf,
        cadastro.data_nascimento,
        cadastro.email,
        id
    ]);

    return resposta.affectedRows;
}

export async function alterarSenha(id, senhaAtual, novaSenha) {
    const conn = await conexao.getConnection();

    const [usuario] = await conn.query(
        'SELECT id FROM Cadastrar WHERE id = ? AND senha = MD5(?)',
        [id, senhaAtual]
    );

    if (usuario.length === 0) {
        conn.release();
        throw new Error('Senha atual incorreta');
    }

    const [resposta] = await conn.query(
        'UPDATE Cadastrar SET senha = MD5(?) WHERE id = ?',
        [novaSenha, id]
    );

    conn.release();
    return resposta.affectedRows;
}

export async function consultarCadastro(id) {
    const comando = `
        SELECT
            c.id,
            c.nome_completo,
            c.cpf,
            c.data_nascimento,
            c.email,
            c.tipo,
            c.status_admin,
            e.cep,
            e.rua_aven,
            e.numero_casa,
            e.bairro
        FROM Cadastrar c
        LEFT JOIN Endereco e ON c.id = e.id_cadastro
        WHERE c.id = ?
    `;

    const [resposta] = await conexao.query(comando, [id]);
    return resposta[0];
}

export async function listarCadastros() {
    const comando = `
        SELECT
            c.id,
            c.nome_completo,
            c.email,
            c.tipo,
            e.bairro
        FROM Cadastrar c
        LEFT JOIN Endereco e ON c.id = e.id_cadastro
        ORDER BY c.nome_completo
    `;

    const [resposta] = await conexao.query(comando);
    return resposta;
}

export async function verificarLogin(email, senha) {
    const comando = `
        SELECT
            id,
            nome_completo,
            email,
            tipo,
            status_admin
        FROM Cadastrar
        WHERE email = ?
        AND senha = MD5(?)
        AND status_admin = 'aprovado'
    `;

    const [resposta] = await conexao.query(comando, [email, senha]);
    return resposta[0];
}

export async function deletarCadastro(id) {
    const comando = `DELETE FROM Cadastrar WHERE id = ?`;
    const [resposta] = await conexao.query(comando, [id]);
    return resposta.affectedRows;
}
