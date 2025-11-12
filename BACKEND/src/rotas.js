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
  app.use(endpointCadastro)
  app.use(endpointCampanhas)
  app.use(endpointSus)
  app.use(endpointMedicamentos)
  app.use(endpointMedicos)
  app.use(endpointConsultas)
  app.use(endpointHistorico)
  app.use(endpointUnidades)
  app.use(endpointEstoques)
  app.use(endpointsAdmin) 
  app.use(endpointRedeSenha)
}
