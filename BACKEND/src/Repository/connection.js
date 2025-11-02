import mysql from 'mysql2/promise'

const conexao =  mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    port: process.env.MYSQL_PORT,
    password: process.env.MYSQL_PWD,
    database: process.env.MYSQL_DB
})


console.log("--Conexão com o banco sucedida!")

export default conexao