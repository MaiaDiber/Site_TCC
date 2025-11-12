import endpointCadastro from './Controller/cadastroController.js';
import endpointCampanhas from './Controller/campanhasController.js';
import endpointSus from './Controller/susController.js';
import endpointMedicamentos from './Controller/medicamentosController.js';
import endpointMedicos from './Controller/medicosController.js';
import endpointConsultas from './Controller/consultasController.js';
import endpointHistorico from './Controller/historicoConsultasController.js';
import endpointUnidades from './Controller/unidadesSaudeController.js';
import endpointEstoques from './Controller/estoquesController.js';

import endpointsAdmin from './Controller/adminController.js';
import endpointRedeSenha from './Controller/redesenhaController.js';

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
