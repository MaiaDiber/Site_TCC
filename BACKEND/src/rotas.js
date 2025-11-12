import cadastroController from './controllers/cadastroController.js';
import campanhasController from './controllers/campanhasController.js';
import susController from './controllers/susController.js';
import medicamentosController from './controllers/medicamentosController.js';
import medicosController from './controllers/medicosController.js';
import consultasController from './controllers/consultasController.js';
import historicoConsultasController from './controllers/historicoConsultasController.js';
import unidadesSaudeController from './controllers/unidadesSaudeController.js';
import estoquesController from './controllers/estoquesController.js';

import endpointLogar from './controllers/logarController.js';
import endpointAdmin from './controllers/adminController.js';
import redesenhaController from './controllers/redesenhaController.js';

export default function Rotas(app) {
  if (cadastroController) app.use('/cadastro', cadastroController);
  if (campanhasController) app.use('/campanhas', campanhasController);
  if (susController) app.use('/sus', susController);
  if (medicamentosController) app.use('/medicamentos', medicamentosController);
  if (medicosController) app.use('/medicos', medicosController);
  if (consultasController) app.use('/consultas', consultasController);
  if (historicoConsultasController) app.use('/historico-consultas', historicoConsultasController);
  if (unidadesSaudeController) app.use('/unidades-saude', unidadesSaudeController);
  if (estoquesController) app.use('/estoques', estoquesController);

  if (endpointLogar) app.use(endpointLogar);
  if (endpointAdmin) app.use('/admin', endpointAdmin);
  if (redesenhaController) app.use('/redesenha', redesenhaController);
}
