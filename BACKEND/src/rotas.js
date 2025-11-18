import cadastroController from './Controller/cadastroController.js'
import susController from './Controller/susController.js'
import medicamentosController from './Controller/medicamentosController.js'
import unidadesSaudeController from './Controller/unidadesSaudeController.js'
import estoquesController from './Controller/estoquesController.js'

import endpointAdmin from './Controller/adminController.js'
import redesenhaController from './Controller/redesenhaController.js'

export default function Rotas(app) {
  app.use('/cadastro', cadastroController)
  app.use('/sus', susController)
  app.use('/medicamentos', medicamentosController)
  app.use('/unidades', unidadesSaudeController)
  app.use('/estoques', estoquesController)
  app.use('/admin', endpointAdmin)
  app.use('/senha', redesenhaController)
}

