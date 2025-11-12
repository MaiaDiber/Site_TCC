import cadastroController from './Controller/cadastroController.js';
import campanhasController from './Controller/campanhasController.js';
import susController from './Controller/susController.js';
import medicamentosController from './Controller/medicamentosController.js';
import medicosController from './Controller/medicosController.js';
import consultasController from './Controller/consultasController.js';
import historicoConsultasController from './Controller/historicoConsultasController.js';
import unidadesSaudeController from './Controller/unidadesSaudeController.js';
import estoquesController from './Controller/estoquesController.js';

import endpointLogar from './Controller/logarController.js';
import endpointAdmin from './Controller/adminController.js';
import redesenhaController from './Controller/redesenhaController.js';

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
