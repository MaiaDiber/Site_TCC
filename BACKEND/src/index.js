import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import Rotas from './rotas.js';

const app = express();
app.use(express.json());


app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (
      origin.includes('localhost') ||
      origin.includes('127.0.0.1') ||
      origin.includes('192.168.') ||
      origin.includes('10.')
    ) {
      return callback(null, true);
    }
    return callback(new Error('CORS bloqueado para esta origem.'));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-access-token']
}));


app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Origin', req.headers.origin || '');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-access-token');
    return res.sendStatus(200);
  }
  next();
});


app.use((req, res, next) => {
  res.setHeader('ngrok-skip-browser-warning', 'true');
  next();
});

Rotas(app);

const PORT = process.env.PORTA || 6045;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
