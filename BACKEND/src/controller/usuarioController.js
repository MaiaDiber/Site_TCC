import express from 'express';
import conexao from '../Repository/connection.js';

const router = express.Router();

router.post('/usuarios', async (req, res) => {
    try {
        const { nome_completo, cpf, data_nascimento, telefone, email, senha,
            cep, rua, numero, bairro, cidade, estado } = req.body;

        const [resultadoUsuario] = await conexao.execute(
            `INSERT INTO usuarios (nome_completo, cpf, data_nascimento, telefone, email, senha)
            VALUES (?, ?, ?, ?, ?, ?)`,
            [nome_completo, cpf, data_nascimento, telefone, email, senha]
        );

        const idUsuario = resultadoUsuario.insertId;


        await conexao.execute(
            `INSERT INTO enderecos (cep, rua, numero, bairro, cidade, estado, tipo_endereco, id_referencia)
            VALUES (?, ?, ?, ?, ?, ?, 'usuario', ?)`,
            [cep, rua, numero, bairro, cidade, estado, idUsuario]
        );

        res.status(201).send({mensagem: "Usuário cadastrado com sucesso!"});

          } catch (erro) {
    console.error(erro);
    res.status(500).send({ erro: "Erro ao cadastrar usuário." });
  }
});

    export default router;