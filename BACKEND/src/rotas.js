import express from 'express'
import usuarioController from './controller/usuarioController'
const router = express.Router()


export  function AdicionarRotas(servidor){
    servidor.use(usuarioController);
}

router.get('/teste', (req, res) => {
  res.json({ mensagem: 'Rota funcionando com sucesso!' })
})

export default router

