import cadastroController from './Controller/cadastroController.js'
import susController from './Controller/susController.js'
import medicamentosController from './Controller/medicamentosController.js'
import unidadesSaudeController from './Controller/unidadesSaudeController.js'
import estoquesController from './Controller/estoquesController.js'

import endpointAdmin from './Controller/adminController.js'
import redesenhaController from './Controller/redesenhaController.js'

export default function Rotas(app) {
  app.use( cadastroController)
  app.use( susController)
  app.use( medicamentosController)
  app.use( unidadesSaudeController)
  app.use( estoquesController)
  app.use( endpointAdmin)
  app.use( redesenhaController)
}

