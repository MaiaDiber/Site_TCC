import * as repo from '../Repository/medicamentosRepository.js';
import { getAuthentication } from '../../utils/jwt.js'
import { Router } from "express";
const endpoints = Router();

const autenticador = getAuthentication();

endpoints.post('/inserir', autenticador, async (req, resp) => {
    let medicamento = req.body;
    let id = await repo.inserirMedicamento(medicamento);

    resp.send({ novoId: id });
});

endpoints.put('/alterar/:id', autenticador, async (req, resp) => {
    let id = req.params.id;
    let medicamento = req.body;

    let linhasAfetadas = await repo.alterarMedicamento(id, medicamento);

    if (linhasAfetadas >= 1) {
        resp.send();
    } else {
        resp.status(404).send({ erro: 'Nenhum registro encontrado' });
    }
});

endpoints.get('/estoque/:id', autenticador, async (req, resp) => {
    let id = req.params.id;

    let registro = await repo.consultarMedicamento(id);

    if (registro) {
        resp.send({ estoque: registro.estoque_produto });
    } else {
        resp.status(404).send({ erro: 'Medicamento não encontrado' });
    }
});

endpoints.delete('/deletar/:id', autenticador, async (req, resp) => {
    let id = req.params.id;

    let linhasAfetadas = await repo.deletarMedicamento(id);

    if (linhasAfetadas >= 1) {
        resp.send();
    } else {
        resp.status(404).send({ erro: 'Nenhum registro encontrado' });
    }
});

endpoints.get('/consultar/:id', autenticador, async (req, resp) => {
    let id = req.params.id;

    let registro = await repo.consultarMedicamento(id);

    if (registro) {
        resp.send(registro);
    } else {
        resp.status(404).send({ erro: 'Nenhum registro encontrado' });
    }
});

endpoints.get('/listar', autenticador, async (req, resp) => {
    let registros = await repo.listarMedicamentos();
    resp.send(registros);
});

export default endpoints;
