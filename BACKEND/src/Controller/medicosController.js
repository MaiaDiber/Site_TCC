import * as repo from '../Repository/medicosRepository.js';
import { getAuthentication } from '../../utils/jwt.js'
import { Router } from "express";
const endpointMedicos = Router();

const autenticador = getAuthentication();

endpointMedicos.post('/inserir', autenticador, async (req, resp) => {
    let medico = req.body;
    let id = await repo.inserirMedico(medico);

    resp.send({ novoId: id });
});

endpointMedicos.put('/alterar/:id', autenticador, async (req, resp) => {
    let id = req.params.id;
    let medico = req.body;

    let linhasAfetadas = await repo.alterarMedico(id, medico);

    if (linhasAfetadas >= 1) {
        resp.send();
    } else {
        resp.status(404).send({ erro: 'Nenhum registro encontrado' });
    }
});

endpointMedicos.delete('/deletar/:id', autenticador, async (req, resp) => {
    let id = req.params.id;

    let linhasAfetadas = await repo.deletarMedico(id);

    if (linhasAfetadas >= 1) {
        resp.send();
    } else {
        resp.status(404).send({ erro: 'Nenhum registro encontrado' });
    }
});

endpointMedicos.get('/consultar/:id', autenticador, async (req, resp) => {
    let id = req.params.id;

    let registro = await repo.consultarMedico(id);

    if (registro) {
        resp.send(registro);
    } else {
        resp.status(404).send({ erro: 'Nenhum registro encontrado' });
    }
});

endpointMedicos.get('/listar', autenticador, async (req, resp) => {
    let registros = await repo.listarMedicos();
    resp.send(registros);
});

export default endpointMedicos;
