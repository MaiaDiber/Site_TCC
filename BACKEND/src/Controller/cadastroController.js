// cadastroController.js - APENAS ROTAS DE USUÁRIOS COMUNS
import * as repo from '../Repository/cadastroRepository.js';
import { getAuthentication } from '../../utils/jwt.js';
import jwt from 'jsonwebtoken';
import { Router } from "express";

const endpoints = Router();
const autenticador = getAuthentication();

// ============================================
// LOGIN (público - qualquer um pode acessar)
// ============================================
endpoints.post('/login', async (req, resp) => {
    try {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return resp.status(400).send({ erro: 'Informe email e senha' });
        }

        const usuario = await repo.verificarLogin(email, senha);

        if (!usuario) {
            return resp.status(401).send({ erro: 'Email ou senha incorretos' });
        }

        // Gera o token JWT
        const token = jwt.sign(
            {
                id: usuario.id,
                nome: usuario.nome_completo,
                email: usuario.email,
                tipo: usuario.tipo
            },
            'ViaSaúde',
            { expiresIn: '24h' }
        );

        resp.send({
            mensagem: 'Login realizado com sucesso',
            token: token,
            usuario: {
                id: usuario.id,
                nome: usuario.nome_completo,
                email: usuario.email,
                tipo: usuario.tipo
            }
        });

    } catch (err) {
        console.error('Erro no login:', err);
        resp.status(500).send({ erro: 'Erro ao realizar login' });
    }
});

// ============================================
// CONSULTAR PRÓPRIO PERFIL (autenticado)
// ============================================
endpoints.get('/perfil', autenticador, async (req, resp) => {
    try {
        const registro = await repo.consultarCadastro(req.user.id);
        
        if (registro) {
            // Remove a senha da resposta (segurança)
            delete registro.senha;
            resp.send(registro);
        } else {
            resp.status(404).send({ erro: 'Usuário não encontrado' });
        }
    } catch (err) {
        console.error('Erro ao consultar perfil:', err);
        resp.status(400).send({ erro: err.message });
    }
});

// ============================================
// ALTERAR PRÓPRIO PERFIL (autenticado)
// ============================================
endpoints.put('/perfil', autenticador, async (req, resp) => {
    try {
        const dados = req.body;
        
        const linhasAfetadas = await repo.alterarCadastro(req.user.id, dados);

        if (linhasAfetadas >= 1) {
            resp.send({ mensagem: 'Perfil atualizado com sucesso!' });
        } else {
            resp.status(404).send({ erro: 'Usuário não encontrado' });
        }
    } catch (err) {
        console.error('Erro ao alterar perfil:', err);
        resp.status(400).send({ erro: err.message });
    }
});

// ============================================
// ALTERAR SENHA (autenticado)
// ============================================
endpoints.put('/alterar-senha', autenticador, async (req, resp) => {
    try {
        const { senhaAtual, novaSenha } = req.body;

        if (!senhaAtual || !novaSenha) {
            return resp.status(400).send({ erro: 'Informe a senha atual e a nova senha' });
        }

        if (novaSenha.length < 6) {
            return resp.status(400).send({ erro: 'A nova senha deve ter no mínimo 6 caracteres' });
        }

        const linhasAfetadas = await repo.alterarSenha(req.user.id, senhaAtual, novaSenha);

        if (linhasAfetadas >= 1) {
            resp.send({ mensagem: 'Senha alterada com sucesso!' });
        } else {
            resp.status(400).send({ erro: 'Não foi possível alterar a senha' });
        }
    } catch (err) {
        console.error('Erro ao alterar senha:', err);
        resp.status(400).send({ erro: err.message });
    }
});

// ============================================
// DELETAR PRÓPRIA CONTA (autenticado)
// ============================================
endpoints.delete('/perfil', autenticador, async (req, resp) => {
    try {
        const linhasAfetadas = await repo.deletarCadastro(req.user.id);

        if (linhasAfetadas >= 1) {
            resp.send({ mensagem: 'Conta deletada com sucesso' });
        } else {
            resp.status(404).send({ erro: 'Usuário não encontrado' });
        }
    } catch (err) {
        console.error('Erro ao deletar conta:', err);
        resp.status(400).send({ erro: err.message });
    }
});

// ============================================
// LISTAR USUÁRIOS (público - para exibições gerais)
// ============================================
endpoints.get('/listar', async (req, resp) => {
    try {
        const registros = await repo.listarCadastros();
        resp.send(registros);
    } catch (err) {
        console.error('Erro ao listar usuários:', err);
        resp.status(400).send({ erro: err.message });
    }
});

export default endpoints;