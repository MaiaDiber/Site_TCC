
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
  app.use(cadastroController)
  app.use(campanhasController)
  app.use(susController)
  app.use(medicamentosController)
  app.use(medicosController)
  app.use(consultasController)
  app.use(historicoConsultasController)
  app.use(unidadesSaudeController)
  app.use(estoquesController)
  app.use(endpointLogar)
  app.use(endpointAdmin)
  app.use(redesenhaController)
}
