import * as repo from '../Repository/cadastroRepository.js';
import { getAuthentication } from '../../utils/jwt.js'

import multer from'multer';
import { Router } from "express";
const endpoints = Router();

const autenticador = getAuthentication();

endpoints.post('/inserir', async (req, resp) => {
    let cadastro = req.body;
    let id = await repo.inserirCadastro(cadastro);

    resp.send({ novoId: id });
});

endpoints.put('/alterar/:id', async (req, resp) => {
    let id = req.params.id;
    let cadastro = req.body;

    let linhasAfetadas = await repo.alterarCadastro(id, cadastro);

    if (linhasAfetadas >= 1) {
        resp.send();
    } else {
        resp.status(404).send({ erro: 'Nenhum registro encontrado' });
    }
});

endpoints.delete('/deletar/:id', async (req, resp) => {
    let id = req.params.id;

    let linhasAfetadas = await repo.deletarCadastro(id);

    if (linhasAfetadas >= 1) {
        resp.send();
    } else {
        resp.status(404).send({ erro: 'Nenhum registro encontrado' });
    }
});

endpoints.get('/consultar/:id', async (req, resp) => {
    let id = req.params.id;

    let registro = await repo.consultarCadastro(id);
    
    if (registro) {
        resp.send(registro);
    } else {
        resp.status(404).send({ erro: 'Nenhum registro encontrado' });
    }
});

endpoints.get('/listar', async (req, resp) => {
    let registros = await repo.listarCadastros();
    resp.send(registros);
});

export default endpoints;

