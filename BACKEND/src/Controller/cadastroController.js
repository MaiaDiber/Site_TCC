import * as repo from '../Repository/cadastroRepository.js';
import { getAuthentication } from '../../utils/jwt.js'
import jwt from 'jsonwebtoken';

import multer from 'multer';
import { Router } from "express";
const endpoints = Router();

const autenticador = getAuthentication();

endpoints.post('/inserir', async (req, resp) => {
    try{
    let cadastro = req.body;
    let id = await repo.inserirCadastro(cadastro);

    resp.send({ novoId: id });
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
});

endpoints.put('/alterar/:id', autenticador, async (req, resp) => {
    let id = req.params.id;
    let cadastro = req.body;

    let linhasAfetadas = await repo.alterarCadastro(id, cadastro);

    if (linhasAfetadas >= 1) {
        resp.send();
    } else {
        resp.status(404).send({ erro: 'Nenhum registro encontrado' });
    }
});

endpoints.delete('/deletar/:id', autenticador, async (req, resp) => {
    let id = req.params.id;

    let linhasAfetadas = await repo.deletarCadastro(id);

    if (linhasAfetadas >= 1) {
        resp.send();
    } else {
        resp.status(404).send({ erro: 'Nenhum registro encontrado' });
    }
});

endpoints.get('/consultar/:id', autenticador, async (req, resp) => {
    let id = req.params.id;

    let registro = await repo.consultarCadastro(id);
    
    if (registro) {
        resp.send(registro);
    } else {
        resp.status(404).send({ erro: 'Nenhum registro encontrado' });
    }
});

endpoints.get('/listar',  async (req, resp) => {
    let registros = await repo.listarCadastros();
    resp.send(registros);
});

endpoints.post('/login', async (req, resp) => {
    let { email, senha } = req.body;

    let usuario = await repo.verificarLogin(email, senha);

    if (usuario) {
        let token = jwt.sign({
            id: usuario.id,
            email: usuario.email,
            tipo: usuario.tipo
        }, 'ViaSaúde');

        resp.send({
            token: token,
            usuario: usuario
        });
    } else {
        resp.status(401).send({ erro: 'Credenciais inválidas' });
    }
});

export default endpoints;

