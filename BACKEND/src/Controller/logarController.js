import { generateToken } from "../../utils/jwt.js";
import * as db from '../Repository/logarRepository.js'
import { Router } from "express"

const endpointLogar = Router()

endpointLogar.post('/entrar', async (req, resp) => {
   try{
     let pessoa = req.body;
    let email = await db.validarUsuario(pessoa);

    if(email == null) {
        resp.send({ erro: "E-mail ou senha incorreto(s)"})
    }
    else {
        let token = generateToken(email)
        resp.send({
            "email": email,
            "token": token 
        })
    }
   }
   catch (err) {
    resp.status(400).send({
        erro: err.message
    })
   }
} ) 


export default endpointLogar;