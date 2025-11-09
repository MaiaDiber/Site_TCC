import conexao from "./connection.js";
import crypto from "crypto-js"

export async function  InseririrUsuario(pessoa) {
    const comando = `
    insert into Cadastrar (email, senha)
    values (?, ?)
    `;

    let hash = crypto.SHA256(pessoa.senha).toString();

    let resposta = await conexao.query(comando, [pessoa.email, hash])
    let info = resposta[0]

    return info.insertId;
}

export async function  validarUsuario(pessoa) {
    const comando = `
    select id, email
    from Cadastrar
    where 
    email = ?
    and senha = ?
    `;

    let hash = crypto.SHA256(pessoa.senha).toString();

    let registros = await conexao.query(comando, [pessoa.email, hash])
    return registros[0][0];
}