import cadastroController from './Controller/cadastroController.js'
import enderecoController from './Controller/enderecoController.js'
import campanhasController from './Controller/campanhasController.js'
import susController from './Controller/susController.js'
import endpointLogar from './Controller/logarController.js'
import endpointAdmin from './Controller/adminController.js'

export default function Rotas(servidor) {
  servidor.use(cadastroController)
  servidor.use(enderecoController)
  servidor.use(campanhasController)
  servidor.use(susController)
  servidor.use(endpointLogar)
  servidor.use(endpointAdmin)
}



