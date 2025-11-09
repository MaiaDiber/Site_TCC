// utils/jwt.js - VERSÃO FINAL CORRIGIDA
import jwt from 'jsonwebtoken';

const KEY = 'ViaSaúde';

// ============================================
// GERAR TOKEN
// ============================================
export function generateToken(userInfo) {
  if (!userInfo.tipo)
    userInfo.tipo = 'paciente';

  return jwt.sign(userInfo, KEY, { expiresIn: '24h' });
}

// ============================================
// EXTRAIR INFORMAÇÕES DO TOKEN
// ============================================
export function getTokenInfo(req) {
  try {
    let token = req.headers['authorization'] || req.headers['x-access-token'];
    
    if (token && token.startsWith('Bearer '))
      token = token.slice(7);

    const decoded = jwt.verify(token, KEY);
    return decoded;
  } catch {
    return null;
  }
}

// ============================================
// MIDDLEWARE DE AUTENTICAÇÃO
// ============================================
export function getAuthentication(checkRole, throw401 = true) {
  return (req, resp, next) => {
    try {
      // ✅ Aceita tanto 'authorization' quanto 'x-access-token'
      let token = req.headers['authorization'] || req.headers['x-access-token'];
      
      if (!token)
        return resp.status(401).send({ erro: 'Token não enviado' });

      if (token.startsWith('Bearer '))
        token = token.slice(7);

      const signd = jwt.verify(token, KEY);
      req.user = signd;

      // Verifica papel (role) se necessário
      if (checkRole && !checkRole(signd) && signd.tipo !== 'admin')
        return resp.status(403).send({ erro: 'Acesso negado' });

      next();
    } catch {
      if (throw401)
        return resp.status(401).send({ erro: 'Token inválido ou expirado' });
      else
        next();
    }
  };
}

// ============================================
// MIDDLEWARE ESPECÍFICO PARA VERIFICAR SE É ADMIN
// ============================================
export function verificarAdmin() {
  return (req, resp, next) => {
    if (req.user && req.user.tipo === 'admin') {
      next();
    } else {
      resp.status(403).send({ erro: 'Acesso negado. Apenas administradores.' });
    }
  };
}