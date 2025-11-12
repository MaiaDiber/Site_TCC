import * as repo from '../Repository/historicoConsultasRepository.js';
import { getAuthentication } from '../../utils/jwt.js'
import { Router } from "express";
const endpointHistorico = Router();

const autenticador = getAuthentication();

endpointHistorico.post('/inserir', autenticador, async (req, resp) => {
    let historico = req.body;
    let id = await repo.inserirHistoricoConsulta(historico);

    resp.send({ novoId: id });
});

endpointHistorico.put('/alterar/:id', autenticador, async (req, resp) => {
    let id = req.params.id;
    let historico = req.body;

    let linhasAfetadas = await repo.alterarHistoricoConsulta(id, historico);

    if (linhasAfetadas >= 1) {
        resp.send();
    } else {
        resp.status(404).send({ erro: 'Nenhum registro encontrado' });
    }
});

endpointHistorico.delete('/deletar/:id', autenticador, async (req, resp) => {
    let id = req.params.id;

    let linhasAfetadas = await repo.deletarHistoricoConsulta(id);

    if (linhasAfetadas >= 1) {
        resp.send();
    } else {
        resp.status(404).send({ erro: 'Nenhum registro encontrado' });
    }
});

endpointHistorico.get('/consultar/:id', autenticador, async (req, resp) => {
    let id = req.params.id;

    let registro = await repo.consultarHistoricoConsulta(id);

    if (registro) {
        resp.send(registro);
    } else {
        resp.status(404).send({ erro: 'Nenhum registro encontrado' });
    }
});

endpointHistorico.get('/listar', autenticador, async (req, resp) => {
    let registros = await repo.listarHistoricoConsultas();
    resp.send(registros);
});

export default endpointHistorico;
