import * as repo from '../Repository/unidadesSaudeRepository.js';
import { getAuthentication } from '../../utils/jwt.js'
import { Router } from "express";
const endpoints = Router();

const autenticador = getAuthentication();

endpoints.post('/inserir', autenticador, async (req, resp) => {
    let unidade = req.body;
    let id = await repo.inserirUnidadeSaude(unidade);

    resp.send({ novoId: id });
});

endpoints.put('/alterar/:id', autenticador, async (req, resp) => {
    let id = req.params.id;
    let unidade = req.body;

    let linhasAfetadas = await repo.alterarUnidadeSaude(id, unidade);

    if (linhasAfetadas >= 1) {
        resp.send();
    } else {
        resp.status(404).send({ erro: 'Nenhum registro encontrado' });
    }
});

endpoints.delete('/deletar/:id', autenticador, async (req, resp) => {
    let id = req.params.id;

    let linhasAfetadas = await repo.deletarUnidadeSaude(id);

    if (linhasAfetadas >= 1) {
        resp.send();
    } else {
        resp.status(404).send({ erro: 'Nenhum registro encontrado' });
    }
});

endpoints.get('/consultar/:id', autenticador, async (req, resp) => {
    let id = req.params.id;

    let registro = await repo.consultarUnidadeSaude(id);

    if (registro) {
        resp.send(registro);
    } else {
        resp.status(404).send({ erro: 'Nenhum registro encontrado' });
    }
});

endpoints.get('/listar', autenticador, async (req, resp) => {
    let registros = await repo.listarUnidadesSaude();
    resp.send(registros);
});

export default endpoints;
