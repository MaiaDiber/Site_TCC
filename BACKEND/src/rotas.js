// Rotas.js
import cadastroController from './Controller/cadastroController.js';
import enderecoController from './Controller/enderecoController.js';
import campanhasController from './Controller/campanhasController.js';
import susController from './Controller/susController.js';
import endpointLogar from './Controller/logarController.js';
import endpointAdmin from './Controller/adminController.js';
import router from './Controller/redesenhaController.js';

export default function Rotas(app) {
  app.use(cadastroController);
  app.use(enderecoController);
  app.use(campanhasController);
  app.use(susController);
  app.use(endpointLogar);
  app.use(endpointAdmin);
  app.use(router); 
}