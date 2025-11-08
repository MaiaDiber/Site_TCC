import * as repo from '../Repository/enderecoRepository.js';
import { getAuthentication } from '../../utils/jwt.js'

import multer from 'multer';
import { Router } from "express";
const endpoints = Router();

const autenticador = getAuthentication();

endpoints.post('/inserir', autenticador, async (req, resp) => {
    let endereco = req.body;
    let id = await repo.inserirEndereco(endereco);

    resp.send({ novoId: id });
});

endpoints.put('/alterar/:id', autenticador, async (req, resp) => {
    let id = req.params.id;
    let endereco = req.body;

    let linhasAfetadas = await repo.alterarEndereco(id, endereco);

    if (linhasAfetadas >= 1) {
        resp.send();
    } else {
        resp.status(404).send({ erro: 'Nenhum registro encontrado' });
    }
});

endpoints.delete('/deletar/:id', autenticador, async (req, resp) => {
    let id = req.params.id;
    let linhasAfetadas = await repo.deletarEndereco(id);

    if (linhasAfetadas >= 1) {
        resp.send();
    } else {
        resp.status(404).send({ erro: 'Nenhum registro encontrado' });
    }
});

endpoints.get('/consultar/:id', autenticador, async (req, resp) => {
    let id = req.params.id;
    let registro = await repo.consultarEndereco(id);

    if (registro) {
        resp.send(registro);
    } else {
        resp.status(404).send({ erro: 'Nenhum registro encontrado' });
    }
});

endpoints.get('/listar', autenticador, async (req, resp) => {
    let registros = await repo.listarEnderecos();
    resp.send(registros);
});

export default endpoints;

