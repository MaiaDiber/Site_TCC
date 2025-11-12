import * as repo from '../Repositorio/estoquesRepository.js';
import { getAuthentication } from '../../utils/jwt.js';
import { Router } from 'express';
const endpoints = Router();

const autenticador = getAuthentication();

endpoints.post('/inserir', autenticador, async (req, resp) => {
  try {
    let estoque = req.body;
    let id = await repo.inserirEstoque(estoque);
    resp.send({ novoId: id });
  } catch (err) {
    console.error(err);
    resp.status(500).send({ erro: 'Erro ao inserir estoque' });
  }
});

endpoints.put('/alterar/:id', autenticador, async (req, resp) => {
  try {
    let id = req.params.id;
    let estoque = req.body;

    let linhasAfetadas = await repo.alterarEstoque(id, estoque);

    if (linhasAfetadas >= 1) {
      resp.send();
    } else {
      resp.status(404).send({ erro: 'Nenhum registro encontrado' });
    }
  } catch (err) {
    console.error(err);
    resp.status(500).send({ erro: 'Erro ao alterar estoque' });
  }
});

endpoints.delete('/deletar/:id', autenticador, async (req, resp) => {
  try {
    let id = req.params.id;

    let linhasAfetadas = await repo.deletarEstoque(id);

    if (linhasAfetadas >= 1) {
      resp.send();
    } else {
      resp.status(404).send({ erro: 'Nenhum registro encontrado' });
    }
  } catch (err) {
    console.error(err);
    resp.status(500).send({ erro: 'Erro ao deletar estoque' });
  }
});

endpoints.get('/consultar/:id', autenticador, async (req, resp) => {
  try {
    let id = req.params.id;

    let registro = await repo.consultarEstoque(id);

    if (registro) {
      resp.send(registro);
    } else {
      resp.status(404).send({ erro: 'Nenhum registro encontrado' });
    }
  } catch (err) {
    console.error(err);
    resp.status(500).send({ erro: 'Erro ao consultar estoque' });
  }
});

endpoints.get('/listar', autenticador, async (req, resp) => {
  try {
    let registros = await repo.listarEstoques();
    resp.send(registros);
  } catch (err) {
    console.error(err);
    resp.status(500).send({ erro: 'Erro ao listar estoques' });
  }
});

export default endpoints;
