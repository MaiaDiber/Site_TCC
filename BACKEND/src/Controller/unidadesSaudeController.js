import * as repo from '../Repositorio/unidadesSaudeRepository.js';
import { getAuthentication } from '../../utils/jwt.js';
import { Router } from 'express';
const endpointUnidades = Router();

const autenticador = getAuthentication();

endpointUnidades.post('/inserir', autenticador, async (req, resp) => {
  try {
    let unidade = req.body;
    let id = await repo.inserirUnidadeSaude(unidade);
    resp.send({ novoId: id });
  } catch (err) {
    console.error(err);
    resp.status(500).send({ erro: 'Erro ao inserir unidade de saúde' });
  }
});

endpointUnidades.put('/alterar/:id', autenticador, async (req, resp) => {
  try {
    let id = req.params.id;
    let unidade = req.body;

    let linhasAfetadas = await repo.alterarUnidadeSaude(id, unidade);

    if (linhasAfetadas >= 1) {
      resp.send();
    } else {
      resp.status(404).send({ erro: 'Nenhum registro encontrado' });
    }
  } catch (err) {
    console.error(err);
    resp.status(500).send({ erro: 'Erro ao alterar unidade' });
  }
});

endpointUnidades.delete('/deletar/:id', autenticador, async (req, resp) => {
  try {
    let id = req.params.id;

    let linhasAfetadas = await repo.deletarUnidadeSaude(id);

    if (linhasAfetadas >= 1) {
      resp.send();
    } else {
      resp.status(404).send({ erro: 'Nenhum registro encontrado' });
    }
  } catch (err) {
    console.error(err);
    resp.status(500).send({ erro: 'Erro ao deletar unidade' });
  }
});

endpointUnidades.get('/consultar/:id', autenticador, async (req, resp) => {
  try {
    let id = req.params.id;

    let registro = await repo.consultarUnidadeSaude(id);

    if (registro) {
      resp.send(registro);
    } else {
      resp.status(404).send({ erro: 'Nenhum registro encontrado' });
    }
  } catch (err) {
    console.error(err);
    resp.status(500).send({ erro: 'Erro ao consultar unidade' });
  }
});

endpointUnidades.get('/listar', autenticador, async (req, resp) => {
  try {
    let registros = await repo.listarUnidadesSaude();
    resp.send(registros);
  } catch (err) {
    console.error(err);
    resp.status(500).send({ erro: 'Erro ao listar unidades' });
  }
});

export default endpointUnidades;
