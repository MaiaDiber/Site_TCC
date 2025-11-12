import * as repo from '../Repositorio/medicamentosRepository.js';
import { importarMedicamentosCSV } from '../services/importarMedicamentos.js';
import { getAuthentication } from '../../utils/jwt.js';
import { Router } from 'express';

const endpointMedicamentos = Router();
const autenticador = getAuthentication();

endpointMedicamentos.post('/inserir', autenticador, async (req, resp) => {
  try {
    let medicamento = req.body;
    let id = await repo.inserirMedicamento(medicamento);
    resp.send({ novoId: id });
  } catch (err) {
    console.error(err);
    resp.status(500).send({ erro: 'Erro ao inserir medicamento' });
  }
});

endpointMedicamentos.put('/alterar/:id', autenticador, async (req, resp) => {
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

endpointMedicamentos.get('/estoque/:id', autenticador, async (req, resp) => {
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

endpointMedicamentos.delete('/deletar/:id', autenticador, async (req, resp) => {
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

endpointMedicamentos.get('/consultar/:id', autenticador, async (req, resp) => {
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

endpointMedicamentos.get('/listar', autenticador, async (req, resp) => {
  try {
    let registros = await repo.listarMedicamentos();
    resp.send(registros);
  } catch (err) {
    console.error(err);
    resp.status(500).send({ erro: 'Erro ao listar medicamentos' });
  }
});

endpointMedicamentos.post('/importar', autenticador, async (req, resp) => {
  try {
    const resultado = await importarMedicamentosCSV('DADOS_ABERTOS_MEDICAMENTOS.csv');
    resp.send({ mensagem: resultado });
  } catch (err) {
    console.error(err);
    resp.status(500).send({ erro: 'Falha ao importar CSV.' });
  }
});

endpointMedicamentos.get('/disponiveis', autenticador, async (req, resp) => {
  try {
    const registros = await repo.listarMedicamentosDisponiveis();
    resp.send(registros);
  } catch (err) {
    console.error(err);
    resp.status(500).send({ erro: 'Erro ao listar medicamentos disponíveis.' });
  }
});

export default endpointMedicamentos;
