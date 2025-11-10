// rotas.js
import express from 'express';
const router = express.Router();

// Importação dos controllers existentes
import cadastroController from './Controller/cadastroController.js';
import enderecoController from './Controller/enderecoController.js';
import campanhasController from './Controller/campanhasController.js';
import susController from './Controller/susController.js';
import medicamentosController from './Controller/medicamentosController.js';
import medicosController from './Controller/medicosController.js';
import consultasController from './Controller/consultasController.js';
import historicoConsultasController from './Controller/historicoConsultasController.js';
import cadastrarAdminController from './Controller/cadastrarAdminController.js';
import enderecoAdminController from './Controller/enderecoAdminController.js';
import unidadesSaudeController from './Controller/unidadesSaudeController.js';
import estoquesController from './Controller/estoquesController.js';

// Novos controllers da outra versão
import endpointLogar from './Controller/logarController.js';
import endpointAdmin from './Controller/adminController.js';
import redesenhaController from './Controller/redesenhaController.js';

// Rotas principais
router.use('/cadastro', cadastroController);
router.use('/endereco', enderecoController);
router.use('/campanhas', campanhasController);
router.use('/sus', susController);
router.use('/medicamentos', medicamentosController);
router.use('/medicos', medicosController);
router.use('/consultas', consultasController);
router.use('/historico-consultas', historicoConsultasController);
router.use('/admin', cadastrarAdminController);
router.use('/endereco-admin', enderecoAdminController);
router.use('/unidades-saude', unidadesSaudeController);
router.use('/estoques', estoquesController);

// Novos endpoints adicionais
router.use(endpointLogar);
router.use(endpointAdmin);
router.use(redesenhaController);

// Teste de rota
router.get('/teste', (req, res) => {
  res.json({ mensagem: 'Rota funcionando com sucesso!' });
});

export default (app) => {
  app.use(router);
};
