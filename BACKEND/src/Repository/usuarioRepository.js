import * as db from '../Repository/usuarioRepository.js';
import { Router } from "express";
const endpoints = Router();

endpoints.post('/entrar/', async (req, resp) => {
    try {
        let pessoa = req.body;
        let usuario = await db.validarUsuario(pessoa);

        if (usuario == null){
            resp.send({ erro: "Usuario ou senha incorreto!"})
        } else {
            let token = gerarToken(usuario);
            resp.send({
                "usuario": usuario,
                "token": token
            })
        }
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

endpoints.post('/usuario', async (req, resp) => {
    try {
        let pessoa = req.body;
        let id = await db.inserirUsuario(pessoa);

        resp.send({
            novoId: id
        })
    }
    catch (err){
        resp.status(400).send({
            erro: err.message
        })
    }
})

export default endpoints;