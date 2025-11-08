import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import Rotas from './rotas.js';

const servidor = express();
servidor.use(express.json());
servidor.use(cors());

Rotas(servidor)

servidor.listen(process.env.PORTA, () =>
    console.log(`---A porta ${process.env.PORTA} subiu com sucesso`)
);
