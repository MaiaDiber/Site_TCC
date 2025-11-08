import conexao from "./connection.js";

export async function inserirCadastro(cadastro) {
    let comando = `
        INSERT INTO Cadastrar (nome_completo, cpf, data_nascimento, senha, email, tipo, id_endereco, id_campanha)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    let [resposta] = await conexao.execute(comando, [
        cadastro.nome_completo,
        cadastro.cpf,
        cadastro.data_nascimento,
        cadastro.senha,
        cadastro.email,
        cadastro.tipo || 'Paciente',
        cadastro.id_endereco,
        cadastro.id_campanha
    ]);
    return resposta.insertId;
}


export async function alterarCadastro(id, cadastro) {
    let comando = `
        UPDATE Cadastrar
        SET nome_completo = ?, cpf = ?, data_nascimento = ?, senha = ?, email = ?, tipo = ?, id_endereco = ?, id_campanha = ?
        WHERE id = ?
    `;

    let [resposta] = await conexao.execute(comando, [
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
