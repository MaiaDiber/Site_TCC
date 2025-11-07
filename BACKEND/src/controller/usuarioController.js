import express from 'express';
import conexao from '../Repository/connection.js';

const router = express.Router();

router.post('/usuarios', async (req, res) => {
    try {
        const { nome_completo, cpf, data_nascimento, email, senha,
            cep, rua, numero, bairro } = req.body;

          const  dataNasc = new Date(data_nascimento);
          const dataMinima = new Date('1900-01-01');
          const dataAtual = new Date();

          if (isNaN(dataNasc.getTime())){
            return res.status(400).send({erro: 'Data de nascimento invalida.'});
          }

          if (dataNasc < dataMinima || dataNasc > dataAtual){
            return res.status(400).send({
              erro: 'Data de nascimento deve estar entre 01/01/1900 e a data atual.'
          });
          }

        const [resultadoUsuario] = await conexao.execute(
            `INSERT INTO usuarios (nome_completo, cpf, data_nascimento, email, senha)
            VALUES (?, ?, ?, ?, ?, ?)`,
            [nome_completo, cpf, data_nascimento, email, senha]
        );

        const idUsuario = resultadoUsuario.insertId;


        await conexao.execute(
            `INSERT INTO enderecos (cep, rua, numero, bairro, id_referencia)
            VALUES (?, ?, ?, ?, ?, ?, 'usuario', ?)`,
            [cep, rua, numero, bairro, idUsuario]
        );

        res.status(201).send({mensagem: "Usuário cadastrado com sucesso!"});

          } catch (erro) {
    console.error(erro);
    res.status(500).send({ erro: "Erro ao cadastrar usuário." });
  }
});

    export default router;