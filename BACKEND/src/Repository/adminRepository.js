// adminRepository.js - VERSÃO FINAL CORRETA
import conexao from "./connection.js";


export async function inserirUsuario(usuario) {
    const comando = `
        INSERT INTO Cadastrar 
        (nome_completo, cpf, data_nascimento, senha, email, tipo, status_admin)
        VALUES (?, ?, ?, MD5(?), ?, 'paciente', 'aprovado')
    `;
    
    const [resposta] = await conexao.query(comando, [
        usuario.nome_completo,
        usuario.cpf,
        usuario.data_nascimento,
        usuario.senha,
        usuario.email
    ]);

    return resposta.insertId;
}

export async function inserirEndereco(endereco, id_cadastro) {
    const comando = `
        INSERT INTO Endereco (cep, rua_aven, numero_casa, bairro, id_cadastro)
        VALUES (?, ?, ?, ?, ?)
    `;
    
    const [resposta] = await conexao.query(comando, [
        endereco.cep,
        endereco.rua_aven,
        endereco.numero_casa,
        endereco.bairro,
        id_cadastro
    ]);

    return resposta.insertId;
}

// ============================================
// SOLICITAÇÃO DE ADMIN
// ============================================
export async function salvarSolicitacaoAdmin(dados) {
    const conn = await conexao.getConnection();
    
    try {
        await conn.beginTransaction();

        // 1. Criar usuário como paciente
        const [usuarioResult] = await conn.query(`
            INSERT INTO Cadastrar 
            (nome_completo, cpf, data_nascimento, senha, email, tipo, status_admin)
            VALUES (?, ?, ?, MD5(?), ?, 'paciente', 'aprovado')
        `, [
            dados.nome_completo,
            dados.cpf,
            dados.data_nascimento,
            dados.senha,
            dados.email
        ]);

        const idUsuario = usuarioResult.insertId;

        // 2. Criar endereço
        await conn.query(`
            INSERT INTO Endereco (cep, rua_aven, numero_casa, bairro, id_cadastro)
            VALUES (?, ?, ?, ?, ?)
        `, [
            dados.cep,
            dados.rua_aven,
            dados.numero_casa,
            dados.bairro,
            idUsuario
        ]);

        // 3. Criar solicitação de admin
        const [solicitacaoResult] = await conn.query(`
            INSERT INTO Solicitacoes_Admin (id_usuario, motivo_solicitacao, status)
            VALUES (?, ?, 'pendente')
        `, [idUsuario, dados.motivo]);

        await conn.commit();
        
        return {
            idUsuario: idUsuario,
            idSolicitacao: solicitacaoResult.insertId
        };

    } catch (error) {
        await conn.rollback();
        throw error;
    } finally {
        conn.release();
    }
}

// ============================================
// LISTAR SOLICITAÇÕES PENDENTES
// ============================================
export async function listarSolicitacoesPendentes() {
    const comando = `
        SELECT 
            s.id AS id_solicitacao,
            s.id_usuario,
            c.nome_completo,
            c.cpf,
            c.email,
            DATE_FORMAT(c.data_nascimento, '%d/%m/%Y') as data_nascimento,
            s.motivo_solicitacao,
            DATE_FORMAT(s.data_solicitacao, '%d/%m/%Y %H:%i') as data_solicitacao
        FROM Solicitacoes_Admin s
        INNER JOIN Cadastrar c ON s.id_usuario = c.id
        WHERE s.status = 'pendente'
        ORDER BY s.data_solicitacao DESC
    `;
    
    const [resposta] = await conexao.query(comando);
    return resposta;
}

// ============================================
// APROVAR SOLICITAÇÃO DE ADMIN
// ============================================
export async function aprovarSolicitacaoAdmin(idSolicitacao, idAdminResponsavel) {
    const conn = await conexao.getConnection();
    
    try {
        await conn.beginTransaction();

        // 1. Buscar id do usuário
        const [solicitacao] = await conn.query(
            'SELECT id_usuario FROM Solicitacoes_Admin WHERE id = ?',
            [idSolicitacao]
        );

        if (solicitacao.length === 0) {
            throw new Error('Solicitação não encontrada');
        }

        const idUsuario = solicitacao[0].id_usuario;

        // 2. Atualizar usuário para admin
        await conn.query(`
            UPDATE Cadastrar 
            SET tipo = 'admin', status_admin = 'aprovado'
            WHERE id = ?
        `, [idUsuario]);

        // 3. Atualizar solicitação
        await conn.query(`
            UPDATE Solicitacoes_Admin 
            SET status = 'aprovado',
                data_resposta = NOW(),
                admin_responsavel = ?
            WHERE id = ?
        `, [idAdminResponsavel, idSolicitacao]);

        await conn.commit();
        
        return { mensagem: 'Solicitação aprovada com sucesso' };

    } catch (error) {
        await conn.rollback();
        throw error;
    } finally {
        conn.release();
    }
}

// ============================================
// RECUSAR SOLICITAÇÃO DE ADMIN
// ============================================
export async function recusarSolicitacaoAdmin(idSolicitacao, idAdminResponsavel) {
    const comando = `
        UPDATE Solicitacoes_Admin 
        SET status = 'recusado',
            data_resposta = NOW(),
            admin_responsavel = ?
        WHERE id = ?
    `;
    
    const [resposta] = await conexao.query(comando, [idAdminResponsavel, idSolicitacao]);
    return resposta.affectedRows;
}

// ============================================
// LOGIN
// ============================================
export async function verificarLogin(email, senha) {
    const comando = `
        SELECT 
            c.id,
            c.nome_completo,
            c.email,
            c.tipo,
            c.status_admin
        FROM Cadastrar c
        WHERE c.email = ? 
        AND c.senha = MD5(?)
        AND c.status_admin = 'aprovado'
    `;
    
    const [resposta] = await conexao.query(comando, [email, senha]);
    return resposta[0];
}

// ============================================
// CRUD DE ADMINS
// ============================================
export async function listarAdmins() {
    const comando = `
        SELECT 
            id,
            nome_completo,
            email,
            cpf,
            data_cadastro
        FROM Cadastrar 
        WHERE tipo = 'admin' 
        AND status_admin = 'aprovado'
        ORDER BY nome_completo
    `;
    
    const [resposta] = await conexao.query(comando);
    return resposta;
}

export async function consultarAdmin(id) {
    const comando = `
        SELECT 
            c.*,
            e.cep,
            e.rua_aven,
            e.numero_casa,
            e.bairro
        FROM Cadastrar c
        LEFT JOIN Endereco e ON c.id = e.id_cadastro
        WHERE c.id = ? AND c.tipo = 'admin'
    `;
    
    const [resposta] = await conexao.query(comando, [id]);
    return resposta[0];
}

export async function alterarAdmin(id, admin) {
    const comando = `
        UPDATE Cadastrar 
        SET nome_completo = ?,
            cpf = ?,
            data_nascimento = ?,
            email = ?
        WHERE id = ? AND tipo = 'admin'
    `;
    
    const [resposta] = await conexao.query(comando, [
        admin.nome_completo,
        admin.cpf,
        admin.data_nascimento,
        admin.email,
        id
    ]);
    
    return resposta.affectedRows;
}

export async function deletarAdmin(id) {
    const comando = `
        UPDATE Cadastrar 
        SET tipo = 'paciente'
        WHERE id = ? AND tipo = 'admin'
    `;
    
    const [resposta] = await conexao.query(comando, [id]);
    return resposta.affectedRows;
}

export async function inserirAdmin(admin) {
    const comando = `
        INSERT INTO Cadastrar (nome_completo, cpf, data_nascimento, senha, email, tipo, status_admin)
        VALUES (?, ?, ?, MD5(?), ?, 'admin', 'aprovado')
    `;
    
    const [resposta] = await conexao.query(comando, [
        admin.nome_completo,
        admin.cpf,
        admin.data_nascimento,
        admin.senha,
        admin.email
    ]);

    return resposta.insertId;
}

