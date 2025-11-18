import * as repo from '../Repository/adminRepository.js';
import jwt from 'jsonwebtoken';
import { Router } from "express";
import { getAuthentication, verificarAdmin } from '../../utils/jwt.js';

const endpointsAdmin = Router();
const autenticador = getAuthentication();
const verificadorAdmin = verificarAdmin();


endpointsAdmin.post('/cadastrar', async (req, resp) => {
    try {
        const dados = req.body;

        if (!dados.nome_completo || !dados.cpf || !dados.email || !dados.senha) {
            return resp.status(400).send({ erro: 'Preencha todos os campos obrigatórios' });
        }

        const idUsuario = await repo.inserirUsuario({
            nome_completo: dados.nome_completo,
            cpf: dados.cpf,
            data_nascimento: dados.data_nascimento,
            senha: dados.senha,
            email: dados.email,
            tipo: dados.tipo,
            status_admin: dados.status_admin,
        });

        await repo.inserirEndereco({
            cep: dados.cep,
            rua_aven: dados.rua_aven,
            numero_casa: dados.numero_casa,
            bairro: dados.bairro
        }, idUsuario);

        resp.send({ 
            mensagem: 'Usuário cadastrado com sucesso!',
            idUsuario: idUsuario
        });

    } catch (err) {
        console.error('Erro ao cadastrar:', err);
        resp.status(400).send({ erro: err.message });
    }
});


endpointsAdmin.post('/solicitar-admin', async (req, resp) => {
    try {
        const dados = req.body;

        if (!dados.nome_completo || !dados.cpf || !dados.email || !dados.senha || !dados.motivo) {
            return resp.status(400).send({ erro: 'Preencha todos os campos obrigatórios' });
        }

        const resultado = await repo.salvarSolicitacaoAdmin(dados);
        
        resp.send({ 
            mensagem: 'Solicitação de administrador enviada com sucesso! Aguarde aprovação.',
            idUsuario: resultado.idUsuario,
            idSolicitacao: resultado.idSolicitacao
        });

    } catch (err) {
        console.error('Erro ao solicitar admin:', err);
        resp.status(400).send({ erro: err.message });
    }
});

endpointsAdmin.post('/login', async (req, resp) => {
    try {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return resp.status(400).send({ erro: 'Informe email e senha' });
        }

        const usuario = await repo.verificarLogin(email, senha);

        if (!usuario) {
            return resp.status(401).send({ erro: 'Email ou senha incorretos' });
        }

        const token = jwt.sign(
            {
                id: usuario.id,
                nome: usuario.nome_completo,
                email: usuario.email,
                tipo: usuario.tipo
            },
            'ViaSaúde',
            { expiresIn: '24h' }
        );

        resp.send({
            mensagem: 'Login realizado com sucesso',
            token: token,
            usuario: {
                id: usuario.id,
                nome: usuario.nome_completo,
                email: usuario.email,
                tipo: usuario.tipo
            }
        });

    } catch (err) {
        console.error('Erro no login:', err);
        resp.status(500).send({ erro: 'Erro ao realizar login' });
    }
});


endpointsAdmin.get('/solicitacoes', autenticador, verificadorAdmin, async (req, resp) => {
    try {
        const solicitacoes = await repo.listarSolicitacoesPendentes();
        resp.send(solicitacoes);
    } catch (err) {
        console.error('Erro ao listar solicitações:', err);
        resp.status(400).send({ erro: err.message });
    }
});


endpointsAdmin.put('/solicitacoes/:id/aprovar', autenticador, verificadorAdmin, async (req, resp) => {
    try {
        const idSolicitacao = req.params.id;
        const idAdminResponsavel = req.user.id;

        await repo.aprovarSolicitacaoAdmin(idSolicitacao, idAdminResponsavel);

        resp.send({ mensagem: 'Solicitação aprovada com sucesso!' });
    } catch (err) {
        console.error('Erro ao aprovar solicitação:', err);
        resp.status(400).send({ erro: err.message });
    }
});


endpointsAdmin.put('/solicitacoes/:id/recusar', autenticador, verificadorAdmin, async (req, resp) => {
    try {
        const idSolicitacao = req.params.id;
        const idAdminResponsavel = req.user.id;

        await repo.recusarSolicitacaoAdmin(idSolicitacao, idAdminResponsavel);

        resp.send({ mensagem: 'Solicitação recusada' });
    } catch (err) {
        console.error('Erro ao recusar solicitação:', err);
        resp.status(400).send({ erro: err.message });
    }
});


endpointsAdmin.post('/inserirAdm', autenticador, verificadorAdmin, async (req, resp) => {
    try {
        const admin = req.body;
        const id = await repo.inserirAdmin(admin);
        resp.send({ novoId: id });
    } catch (err) {
        resp.status(400).send({ erro: err.message });
    }
});

endpointsAdmin.put('/alterarAdm/:id', autenticador, verificadorAdmin, async (req, resp) => {
    try {
        const id = req.params.id;
        const admin = req.body;

        const linhas = await repo.alterarAdmin(id, admin);
        if (linhas >= 1) resp.send({ mensagem: 'Admin alterado com sucesso' });
        else resp.status(404).send({ erro: 'Administrador não encontrado' });
    } catch (err) {
        resp.status(400).send({ erro: err.message });
    }
});

endpointsAdmin.delete('/deletarAdm/:id', autenticador, verificadorAdmin, async (req, resp) => {
    try {
        const id = req.params.id;
        const linhas = await repo.deletarAdmin(id);
        if (linhas >= 1) resp.send({ mensagem: 'Admin removido com sucesso' });
        else resp.status(404).send({ erro: 'Administrador não encontrado' });
    } catch (err) {
        resp.status(400).send({ erro: err.message });
    }
});

endpointsAdmin.get('/consultarAdm/:id', autenticador, verificadorAdmin, async (req, resp) => {
    try {
        const id = req.params.id;
        const admin = await repo.consultarAdmin(id);
        if (admin) resp.send(admin);
        else resp.status(404).send({ erro: 'Administrador não encontrado' });
    } catch (err) {
        resp.status(400).send({ erro: err.message });
    }
});

endpointsAdmin.get('/listarAdm', autenticador, verificadorAdmin, async (req, resp) => {
    try {
        const admins = await repo.listarAdmins();
        resp.send(admins);
    } catch (err) {
        resp.status(400).send({ erro: err.message });
    }
});

endpointsAdmin.get('/perfil', autenticador, async (req, resp) => {
  try {
    const idUsuario = req.user.id;

    const usuario = await repo.buscarPerfil(idUsuario);
    if (!usuario)
      return resp.status(404).send({ erro: 'Usuário não encontrado' });

    delete usuario.senha; 

    resp.send(usuario);
  } catch (err) {
    console.error('Erro ao buscar perfil:', err);
    resp.status(500).send({ erro: 'Erro ao buscar dados do perfil' });
  }
});


endpointsAdmin.put('/perfil/atualizar', autenticador, async (req, resp) => {
  try {
    const idUsuario = req.user.id;
    const { nome_completo, email, data_nascimento } = req.body;

    if (!nome_completo || !email || !data_nascimento) {
      return resp.status(400).send({
        erro: 'Nome, email e data de nascimento são obrigatórios',
      });
    }

    await repo.atualizarPerfil(idUsuario, req.body);

    resp.send({ mensagem: 'Perfil atualizado com sucesso!' });
  } catch (err) {
    console.error('Erro ao atualizar perfil:', err);
    resp.status(500).send({ erro: 'Erro ao atualizar perfil' });
  }
});

export default endpointsAdmin

