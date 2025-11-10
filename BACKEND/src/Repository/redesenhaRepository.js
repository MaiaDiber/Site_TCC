// src/Repository/redesenhaRepository.js
import conexao from "./connection.js";

// Buscar usuário por e-mail
export async function buscarUsuarioPorEmail(email) {
    const [rows] = await conexao.query(
        'SELECT * FROM Cadastrar WHERE email = ?',
        [email]
    );
    return rows[0];
}

// Buscar usuário por token de redefinição
export async function buscarUsuarioPorResetToken(token) {
    const [rows] = await conexao.query(
        `SELECT * FROM Cadastrar 
         WHERE resetToken = ? AND resetExpires > NOW()`,
        [token]
    );
    return rows[0];
}

// Atualizar token de redefinição
export async function atualizarResetToken(id, token, expires) {
    await conexao.query(
        'UPDATE Cadastrar SET resetToken = ?, resetExpires = ? WHERE id = ?',
        [token, expires, id]
    );
}

// Redefinir senha e limpar token
// ✅ MUDANÇA: Agora usa MD5() direto no MySQL
export async function redefinirSenha(id, novaSenha) {
    await conexao.query(
        `UPDATE Cadastrar 
         SET senha = MD5(?), resetToken = NULL, resetExpires = NULL 
         WHERE id = ?`,
        [novaSenha, id]
    );
}