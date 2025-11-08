import conexao from "./connection.js";

export async function inserirCadastro(cadastro) {
    const conn = await conexao.getConnection(); 
    
    try {
        await conn.beginTransaction();

        
        let comandoCadastro = `
            INSERT INTO Cadastrar (nome_completo, cpf, data_nascimento, senha, email)
            VALUES (?, ?, ?, ?, ?)
        `;

        let [resposta] = await conn.query(comandoCadastro, [
            cadastro.nome_completo,
            cadastro.cpf,
            cadastro.data_nascimento,
            cadastro.senha,
            cadastro.email
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
        return idNovoUsuario;

    } catch (error) {
        await conn.rollback();
        throw error;
    }
}


export async function alterarCadastro(id, cadastro) {
    let comando = `
        UPDATE Cadastrar
        SET nome_completo = ?, cpf = ?, data_nascimento = ?, senha = ?, email = ?, tipo = ?, id_endereco = ?, id_campanha = ?
        WHERE id = ?
    `;

    let [resposta] = await conexao.query(comando, [
        cadastro.nome_completo,
        cadastro.cpf,
        cadastro.data_nascimento,
        cadastro.senha,
        cadastro.email,
        cadastro.tipo || 'Paciente',
        cadastro.id_endereco,
        cadastro.id_campanha,
        id
    ]);

    return resposta.affectedRows;
}

export async function deletarCadastro(id) {
    let comando = `DELETE FROM Cadastrar WHERE id = ?`;

    let [resposta] = await conexao.query(comando, [id]);

    return resposta.affectedRows;
}

export async function consultarCadastro(id) {
    let comando = `
                SELECT * FROM Cadastrar
                WHERE id = ?`;

    let [resposta] = await conexao.query(comando, [id]);

    return resposta[0];
}

export async function listarCadastros() {
    let comando = `SELECT * from Endereco
                    inner join Cadastrar on Endereco.id = Cadastrar.id;`;

    let [resposta] = await conexao.query(comando);

    return resposta;
}

export async function verificarLogin(email, senha) {
    let comando = `SELECT id, nome_completo, email, tipo FROM Cadastrar WHERE email = ? AND senha = ?`;

    let [resposta] = await conexao.query(comando, [email, senha]);

    return resposta[0];
}
