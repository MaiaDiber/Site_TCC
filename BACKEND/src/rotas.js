import express from 'express'
import usuarioController from './controller/usuarioController'
const router = express.Router()

import cadastroController from './controller/cadastroController.js'
import enderecoController from './controller/enderecoController.js'
import campanhasController from './controller/campanhasController.js'
import susController from './controller/susController.js'

router.use('/cadastro', cadastroController)
router.use('/endereco', enderecoController)
router.use('/campanhas', campanhasController)
router.use('/sus', susController)

export  function AdicionarRotas(servidor){
    servidor.use(usuarioController);
}

router.get('/teste', (req, res) => {
  res.json({ mensagem: 'Rota funcionando com sucesso!' })
})

export default router

