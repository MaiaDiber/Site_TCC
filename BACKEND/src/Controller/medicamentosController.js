import * as repo from '../Repository/medicamentosRepository.js';
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

    if (linhasAfetadas >= 1) resp.send();
    else resp.status(404).send({ erro: 'Nenhum registro encontrado' });
  } catch (err) {
    console.error(err);
    resp.status(500).send({ erro: 'Erro ao alterar medicamento' });
  }
});


endpointMedicamentos.get('/estoque/:id', autenticador, async (req, resp) => {
  try {
    let id = req.params.id;
    let registro = await repo.consultarMedicamento(id);

    if (registro) resp.send({ estoque: registro.estoque_produto });
    else resp.status(404).send({ erro: 'Medicamento não encontrado' });
  } catch (err) {
    console.error(err);
    resp.status(500).send({ erro: 'Erro ao consultar estoque' });
  }
});


endpointMedicamentos.delete('/deletar/:id', autenticador, async (req, resp) => {
  try {
    let id = req.params.id;
    let linhasAfetadas = await repo.deletarMedicamento(id);

    if (linhasAfetadas >= 1) resp.send();
    else resp.status(404).send({ erro: 'Nenhum registro encontrado' });
  } catch (err) {
    console.error(err);
    resp.status(500).send({ erro: 'Erro ao deletar medicamento' });
  }
});


endpointMedicamentos.get('/consultar/:id', autenticador, async (req, resp) => {
  try {
    let id = req.params.id;
    let registro = await repo.consultarMedicamento(id);

    if (registro) resp.send(registro);
    else resp.status(404).send({ erro: 'Nenhum registro encontrado' });
  } catch (err) {
    console.error(err);
    resp.status(500).send({ erro: 'Erro ao consultar medicamento' });
  }
});


endpointMedicamentos.get('/listar', async (req, resp) => {
  try {
    const registros = await repo.listarMedicamentos();
    
    if (registros && registros.length > 0) {
      console.log(`📦 Retornando ${registros.length} medicamentos com estoque`);
      resp.send(registros);
    } else {
      console.log('⚠️ Nenhum medicamento com estoque encontrado');
      resp.status(404).send({ erro: 'Nenhum medicamento disponível no momento' });
    }
  } catch (err) {
    console.error('❌ Erro ao listar medicamentos:', err);
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


endpointMedicamentos.get('/verificar-existencia', autenticador, async (req, resp) => {
  try {
    const existe = await repo.verificarExistenciaMedicamentos();
    resp.send({ existe: existe });
  } catch (err) {
    console.error(err);
    resp.status(500).send({ erro: 'Erro ao verificar medicamentos' });
  }
});


endpointMedicamentos.get('/todos', autenticador, async (req, resp) => {
  try {
    const registros = await repo.listarTodosMedicamentos();
    resp.send(registros);
  } catch (err) {
    console.error(err);
    resp.status(500).send({ erro: 'Erro ao listar todos os medicamentos' });
  }
});


endpointMedicamentos.get('/verificar-datas', async (req, resp) => {
  try {
    const [medicamentos] = await conexao.execute(`
      SELECT 
        nome_produto,
        data_registro,
        data_validade
      FROM Medicamentos 
      WHERE estoque_produto > 0
      LIMIT 10
    `);
    
    console.log('📋 MEDICAMENTOS NO BANCO:');
    medicamentos.forEach(med => {
      console.log(`💊 ${med.nome_produto}`);
      console.log(`   📋 Registro: ${med.data_registro}`);
      console.log(`   📅 Validade: ${med.data_validade}`);
    });
    
    resp.send(medicamentos);
  } catch (err) {
    console.error(err);
    resp.status(500).send({ erro: 'Erro ao verificar datas' });
  }
});




export default endpointMedicamentos;
