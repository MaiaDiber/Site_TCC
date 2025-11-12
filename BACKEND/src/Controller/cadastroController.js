import * as repo from '../Repository/cadastroRepository.js';
import { getAuthentication } from '../../utils/jwt.js';
import jwt from 'jsonwebtoken';
import { Router } from "express";

const endpointCadastro = Router();
const autenticador = getAuthentication();

endpointCadastro.post('/inserir', async (req, resp) => {
    let cadastro = req.body;
    let id = await repo.inserirCadastro(cadastro);

    resp.send({ novoId: id });
});

endpointCadastro.put('/alterar/:id', autenticador, async (req, resp) => {
    let id = req.params.id;
    let cadastro = req.body;

    let linhasAfetadas = await repo.alterarCadastro(id, cadastro);

    if (linhasAfetadas >= 1) {
        resp.send();
    } else {
        resp.status(404).send({ erro: 'Nenhum registro encontrado' });
    }
});

endpointCadastro.delete('/deletar/:id', autenticador, async (req, resp) => {
    let id = req.params.id;

    let linhasAfetadas = await repo.deletarCadastro(id);

    if (linhasAfetadas >= 1) {
        resp.send();
    } else {
        resp.status(404).send({ erro: 'Nenhum registro encontrado' });
    }
});

endpointCadastro.get('/consultar/:id', autenticador, async (req, resp) => {
    let id = req.params.id;

    let registro = await repo.consultarCadastro(id);

    if (registro) {
        resp.send(registro);
    } else {
        resp.status(404).send({ erro: 'Nenhum registro encontrado' });
    }
});

endpointCadastro.get('/listar', autenticador, async (req, resp) => {
    let registros = await repo.listarCadastros();
    resp.send(registros);
});

endpointCadastro.post('/login', async (req, resp) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return resp.status(400).send({ erro: 'Informe email e senha' });
    }

    const usuario = await repo.verificarLogin(email, senha);

    if (!usuario) {
        return resp.status(401).send({ erro: 'Email ou senha incorretos' });
    }

    const token = jwt.sign(
        {
            id: usuario.id,
            nome: usuario.nome_completo,
            email: usuario.email
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
            email: usuario.email
        }
    });
});

endpointCadastro.get('/perfil', autenticador, async (req, resp) => {
    const registro = await repo.consultarCadastro(req.user.id);

    if (registro) {
        delete registro.senha;
        resp.send(registro);
    } else {
        resp.status(404).send({ erro: 'Usuário não encontrado' });
    }
});

endpointCadastro.put('/perfil', autenticador, async (req, resp) => {
    const dados = req.body;

    const linhasAfetadas = await repo.alterarCadastro(req.user.id, dados);

    if (linhasAfetadas >= 1) {
        resp.send({ mensagem: 'Perfil atualizado com sucesso!' });
    } else {
        resp.status(404).send({ erro: 'Usuário não encontrado' });
    }
});

endpointCadastro.put('/alterar-senha', autenticador, async (req, resp) => {
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
});

endpointCadastro.delete('/perfil', autenticador, async (req, resp) => {
    const linhasAfetadas = await repo.deletarCadastro(req.user.id);

    if (linhasAfetadas >= 1) {
        resp.send({ mensagem: 'Conta deletada com sucesso' });
    } else {
        resp.status(404).send({ erro: 'Usuário não encontrado' });
    }
});

endpointCadastro.get('/listar-publico', async (req, resp) => {
    const registros = await repo.listarCadastros();
    resp.send(registros);
});

export default endpointCadastro;
