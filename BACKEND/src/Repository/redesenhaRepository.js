
import conexao from "./connection.js";


export async function buscarUsuarioPorEmail(email) {
    const [rows] = await conexao.query(
        'SELECT * FROM Cadastrar WHERE email = ?',
        [email]
    );
    return rows[0];
}


export async function buscarUsuarioPorResetToken(token) {
    const [rows] = await conexao.query(
        `SELECT * FROM Cadastrar 
         WHERE resetToken = ? AND resetExpires > NOW()`,
        [token]
    );
    return rows[0];
}


export async function atualizarResetToken(id, token, expires) {
    await conexao.query(
        'UPDATE Cadastrar SET resetToken = ?, resetExpires = ? WHERE id = ?',
        [token, expires, id]
    );
}


export async function redefinirSenha(id, novaSenha) {
    await conexao.query(
        `UPDATE Cadastrar 
         SET senha = MD5(?), resetToken = NULL, resetExpires = NULL 
         WHERE id = ?`,
        [novaSenha, id]
    );
}