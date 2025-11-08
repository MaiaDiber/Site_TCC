import express from 'express'
const router = express.Router()

import cadastroController from './Controller/cadastroController.js'
import enderecoController from './Controller/enderecoController.js'
import campanhasController from './Controller/campanhasController.js'
import susController from './Controller/susController.js'
import adminController from './Controller/adminController.js'

router.use('/admin', adminController)
router.use('/cadastro', cadastroController)
router.use('/endereco', enderecoController)
router.use('/campanhas', campanhasController)
router.use('/sus', susController)

router.get('/teste', (req, res) => {
  res.json({ mensagem: 'Rota funcionando com sucesso!' })
})

export default router

