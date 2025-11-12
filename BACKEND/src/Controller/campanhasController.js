import * as repo from '../Repository/campanhasRepository.js';
import { getAuthentication } from '../../utils/jwt.js'

import multer from 'multer';
import { Router } from "express";
const endpointCampanhas = Router();

const autenticador = getAuthentication();

const uploadImagem = multer({ dest: './public/strorage/' });

endpointCampanhas.post('/inserir', autenticador, uploadImagem.single('imagem'), async (req, resp) => {
    let campanha = req.body;

    if (req.file) {
        campanha.imagem = req.file.filename;
    }
    let id = await repo.inserirCampanha(campanha);
    resp.send({ novoId: id });
});

endpointCampanhas.put('/alterar/:id', autenticador, uploadImagem.single('imagem'), async (req, resp) => {
    let id = req.params.id;
    let campanha = req.body;

    if (req.file) {
        campanha.imagem = req.file.filename;
    }
    let linhasAfetadas = await repo.alterarCampanha(id, campanha);
    if (linhasAfetadas >= 1) {
        resp.send();
    } 
    else {
        resp.status(404).send({ erro: 'Nenhum registro encontrado' });
    }
});

endpointCampanhas.delete('/deletar/:id', autenticador, async (req, resp) => {
    let id = req.params.id;
    let linhasAfetadas = await repo.deletarCampanha(id);
    if (linhasAfetadas >= 1) {
        resp.send();
    } 
    else {
        resp.status(404).send({ erro: 'Nenhum registro encontrado' });
    }
});

endpointCampanhas.get('/consultar/:id', autenticador, async (req, resp) => {
    let id = req.params.id;
    let registro = await repo.consultarCampanha(id);

    if (registro) {
        resp.send(registro);
    } 
    else {
        resp.status(404).send({ erro: 'Nenhum registro encontrado' });
    }
});

endpointCampanhas.get('/listar', autenticador, async (req, resp) => {
    let registros = await repo.listarCampanhas();
    resp.send(registros);
});

export default endpointCampanhas;

