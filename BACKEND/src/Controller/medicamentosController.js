import * as repo from '../Repository/medicamentosRepository.js';
import { importarMedicamentosCSV } from '../services/importarMedicamentos.js';
import { getAuthentication } from '../../utils/jwt.js';
import { Router } from 'express';

const endpoints = Router();
const autenticador = getAuthentication();

/**
 * Inserir novo medicamento
 */
endpoints.post('/inserir', autenticador, async (req, resp) => {
  try {
    let medicamento = req.body;
    let id = await repo.inserirMedicamento(medicamento);
    resp.send({ novoId: id });
  } catch (err) {
    console.error(err);
    resp.status(500).send({ erro: 'Erro ao inserir medicamento' });
  }
});

/**
 * Alterar medicamento existente
 */
endpoints.put('/alterar/:id', autenticador, async (req, resp) => {
  try {
    let id = req.params.id;
    let medicamento = req.body;

    let linhasAfetadas = await repo.alterarMedicamento(id, medicamento);

    if (linhasAfetadas >= 1) {
      resp.send();
    } else {
      resp.status(404).send({ erro: 'Nenhum registro encontrado' });
    }
  } catch (err) {
    console.error(err);
    resp.status(500).send({ erro: 'Erro ao alterar medicamento' });
  }
});

/**
 * Consultar estoque de um medicamento
 */
endpoints.get('/estoque/:id', autenticador, async (req, resp) => {
  try {
    let id = req.params.id;

    let registro = await repo.consultarMedicamento(id);

    if (registro) {
      resp.send({ estoque: registro.estoque_produto });
    } else {
      resp.status(404).send({ erro: 'Medicamento não encontrado' });
    }
  } catch (err) {
    console.error(err);
    resp.status(500).send({ erro: 'Erro ao consultar estoque' });
  }
});

/**
 * Deletar medicamento
 */
endpoints.delete('/deletar/:id', autenticador, async (req, resp) => {
  try {
    let id = req.params.id;

    let linhasAfetadas = await repo.deletarMedicamento(id);

    if (linhasAfetadas >= 1) {
      resp.send();
    } else {
      resp.status(404).send({ erro: 'Nenhum registro encontrado' });
    }
  } catch (err) {
    console.error(err);
    resp.status(500).send({ erro: 'Erro ao deletar medicamento' });
  }
});

/**
 * Consultar medicamento por ID
 */
endpoints.get('/consultar/:id', autenticador, async (req, resp) => {
  try {
    let id = req.params.id;

    let registro = await repo.consultarMedicamento(id);

    if (registro) {
      resp.send(registro);
    } else {
      resp.status(404).send({ erro: 'Nenhum registro encontrado' });
    }
  } catch (err) {
    console.error(err);
    resp.status(500).send({ erro: 'Erro ao consultar medicamento' });
  }
});

/**
 * Listar todos os medicamentos
 * ⚠️ Esta rota NÃO exige autenticação — liberada para o frontend
 */
endpoints.get('/listar', async (req, resp) => {
  try {
    let registros = await repo.listarMedicamentos();
    resp.send(registros);
  } catch (err) {
    console.error(err);
    resp.status(500).send({ erro: 'Erro ao listar medicamentos' });
  }
});

/**
 * Importar medicamentos via CSV
 */
endpoints.post('/importar', autenticador, async (req, resp) => {
  try {
    const resultado = await importarMedicamentosCSV('DADOS_ABERTOS_MEDICAMENTOS.csv');
    resp.send({ mensagem: resultado });
  } catch (err) {
    console.error(err);
    resp.status(500).send({ erro: 'Falha ao importar CSV.' });
  }
});

/**
 * Listar medicamentos disponíveis (estoque > 0)
 */
endpoints.get('/disponiveis', autenticador, async (req, resp) => {
  try {
    const registros = await repo.listarMedicamentosDisponiveis();
    resp.send(registros);
  } catch (err) {
    console.error(err);
    resp.status(500).send({ erro: 'Erro ao listar medicamentos disponíveis.' });
  }
});

export default endpoints;
