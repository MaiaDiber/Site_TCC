import express from 'express'

const router = express.Router()


router.get('/teste', (req, res) => {
  res.json({ mensagem: 'Rota funcionando com sucesso!' })
})

export default router

