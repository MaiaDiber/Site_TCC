import mysql from 'mysql2/promise';
import 'dotenv/config';

const conexao = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  port: process.env.MYSQL_PORT,
  password: process.env.MYSQL_PWD,
  database: process.env.MYSQL_DB
});

try {
  const [rows] = await conexao.query('SELECT 1');
  console.log('--Conexão com o banco sucedida!');
} catch (err) {
  console.log('--Falha ao conectar no banco:', err.message);
}

export default conexao;

