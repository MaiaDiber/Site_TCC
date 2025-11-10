// src/Controller/esqueciSenhaController.js
import { Router } from 'express';
import crypto from 'crypto';
import { enviarEmailRedefinicao } from '../services/emailService.js';
import * as usuarioRepository from '../Repository/redesenhaRepository.js';

const router = Router();

// Rota para solicitar redefinição de senha
router.post('/recuperar-senha', async (req, res) => {
    const { email } = req.body;

    try {
        const usuario = await usuarioRepository.buscarUsuarioPorEmail(email);

        if (!usuario) {
            return res.status(404).json({ error: "E-mail não encontrado." });
        }

        const token = crypto.randomBytes(32).toString('hex');
        const expireTime = new Date();
        expireTime.setHours(expireTime.getHours() + 1);

        await usuarioRepository.atualizarResetToken(usuario.id, token, expireTime);

        res.status(200).json({ 
            success: true, 
            message: "Verifique seu e-mail para redefinir a senha." 
        });

        // Envia e-mail em segundo plano
        enviarEmailRedefinicao(email, token)
            .then(() => console.log(`E-mail enviado para ${email}`))
            .catch(err => console.error("Erro ao enviar e-mail:", err));

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erro ao solicitar recuperação." });
    }
});

// Rota para redefinir a senha
router.post('/reset-password', async (req, res) => {
    const { token, novaSenha } = req.body;

    try {
        const usuario = await usuarioRepository.buscarUsuarioPorResetToken(token);

        if (!usuario) {
            return res.status(400).json({ error: "Token inválido ou expirado." });
        }

        // ✅ MUDANÇA: Usar MD5 (igual o resto do projeto)
        // Não precisa importar nada, o MySQL faz isso
        await usuarioRepository.redefinirSenha(usuario.id, novaSenha);

        res.json({ message: "Senha atualizada com sucesso!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erro ao redefinir senha." });
    }
});

export default router;