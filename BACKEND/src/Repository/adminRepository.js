import conexao from "./connection";

export async function inserirAdmin(admin){
    const comando = `
    INSERT INTO Cadastrar_admin (nome_completo, cpf, data_nascimento, senha, email)
    VALUES (?, ?, ?,  MD5(?), ?)`;
    
    const [resposta] = await conexao.execute(comando, [
        admin.nome_completo,
        admin.cpf,
        admin.data_nascimento,
        admin.senha,
        admin.email
    ]);

    return resposta.affectedRows;
}

export async function deletarAdmin(id) {
    const comando = `DELETE FROM Cadastrar_admin WHERE id = ?`;

    const [resposta] = await conexao.execute(comando, [id]);
    return resposta.affectedRows;
}

export async function consultarAdmin(id){
const comando = `SELECT * FROM Cadastrar_admin WHERE id = ?`;

const [resposta] = await conexao.execute(comando, [id]);
return resposta[0];
}

export async function listarAdmins(){
    const comando = `SELECT * FROM Cadastrar_admin`;

    const[resposta] = await conexao.execute(comando);
    return resposta;
}

export async function verificarAdminLogin(email, senha){
const comando =`
SELECT id, nome_completo, email
FROM Cadastrar_admin
WHERE email = ? AND senha = MD5(?) `;

const [resposta] = await conexao.execute(comando, [email, senha]);
return resposta[0];
}