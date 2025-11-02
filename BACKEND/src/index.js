import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import conexao from './Repository/connection.js';
import rotas  from './rotas.js'

const servidor = express();
servidor.use(express.json());
servidor.use(cors());


servidor.listen(process.env.PORTA, () => console.log(`---A porta ${process.env.PORTA} subiu com sucesso`))