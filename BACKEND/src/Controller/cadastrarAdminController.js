import * as repo from '../Repository/cadastrarAdminRepository.js';
import { getAuthentication } from '../../utils/jwt.js'
import jwt from 'jsonwebtoken';
import { Router } from "express";
const endpoints = Router();

const autenticador = getAuthentication();

endpoints.post('/inserir', async (req, resp) => {
    let admin = req.body;
    let id = await repo.inserirAdmin(admin);

    resp.send({ novoId: id });
});

endpoints.put('/alterar/:id', autenticador, async (req, resp) => {
    let id = req.params.id;
    let admin = req.body;

    let linhasAfetadas = await repo.alterarAdmin(id, admin);

    if (linhasAfetadas >= 1) {
        resp.send();
    } else {
        resp.status(404).send({ erro: 'Nenhum registro encontrado' });
    }
});

endpoints.delete('/deletar/:id', autenticador, async (req, resp) => {
    let id = req.params.id;

    let linhasAfetadas = await repo.deletarAdmin(id);

    if (linhasAfetadas >= 1) {
        resp.send();
    } else {
        resp.status(404).send({ erro: 'Nenhum registro encontrado' });
    }
});

endpoints.get('/consultar/:id', autenticador, async (req, resp) => {
    let id = req.params.id;

    let registro = await repo.consultarAdmin(id);

    if (registro) {
        resp.send(registro);
    } else {
        resp.status(404).send({ erro: 'Nenhum registro encontrado' });
    }
});

endpoints.get('/listar', autenticador, async (req, resp) => {
    let registros = await repo.listarAdmins();
    resp.send(registros);
});

endpoints.post('/login', async (req, resp) => {
    let { email, senha } = req.body;

    let usuario = await repo.verificarLoginAdmin(email, senha);

    if (usuario) {
        let token = jwt.sign({
            id: usuario.id,
            nome: usuario.nome_completo,
            email: usuario.email
        }, 'borapracima');

        resp.send({
            token: token,
            usuario: usuario
        });
    } else {
        resp.status(401).send({ erro: 'Credenciais inválidas' });
    }
});

export default endpoints;
