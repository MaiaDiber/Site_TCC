import * as repo from '../Repository/adminRepository.js';
import { getAuthentication } from '../../utils/jwt.js';
import jwt from 'jsonwebtoken';
import { Router } from "express";

const endpoints = Router();
const autenticador = getAuthentication();


endpoints.post('/inserir', autenticador, async (req, resp) => {
    try {
        const admin = req.body;
        const id = await repo.inserirAdmin(admin);
        resp.send({ novoId: id });
    } catch (err) {
        resp.status(400).send({ erro: err.message });
    }
});


endpoints.put('/alterar/:id', autenticador, async (req, resp) => {
    const id = req.params.id;
    const admin = req.body;

    const linhas = await repo.alterarAdmin(id, admin);
    if (linhas >= 1) resp.send();
    else resp.status(404).send({ erro: 'Administrador não encontrado' });
});


endpoints.delete('/deletar/:id', autenticador, async (req, resp) => {
    const id = req.params.id;
    const linhas = await repo.deletarAdmin(id);
    if (linhas >= 1) resp.send();
    else resp.status(404).send({ erro: 'Administrador não encontrado' });
});


endpoints.get('/consultar/:id', autenticador, async (req, resp) => {
    const id = req.params.id;
    const admin = await repo.consultarAdmin(id);
    if (admin) resp.send(admin);
    else resp.status(404).send({ erro: 'Administrador não encontrado' });
});


endpoints.get('/listar', autenticador, async (req, resp) => {
    const admins = await repo.listarAdmins();
    resp.send(admins);
});


endpoints.post('/login', async (req, resp) => {
    const { email, senha } = req.body;
    const admin = await repo.verificarLogin(email, senha);

    if (admin) {
        const token = jwt.sign(
            {
                id: admin.id,
                nome: admin.nome_completo,
                email: admin.email,
                tipo: 'adm'
            },
            'borapracima'
        );

        resp.send({
            token: token,
            usuario: admin
        });
    } else {
        resp.status(401).send({ erro: 'Credenciais inválidas' });
    }
});

export default endpoints;
