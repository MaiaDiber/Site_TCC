import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import rotas from './rotas.js'

const servidor = express();
servidor.use(express.json());
servidor.use(cors());

servidor.use(rotas);

servidor.listen(process.env.PORTA, () =>
    console.log(`---A porta ${process.env.PORTA} subiu com sucesso`)
);
