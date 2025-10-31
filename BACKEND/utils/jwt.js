import jwt from 'jsonwebtoken'

const KEY = 'borapracima'


export function generateToken(userInfo) {
  if (!userInfo.role)
    userInfo.role = 'user';

  return jwt.sign(userInfo, KEY)
}

export function getTokenInfo(req) {
  try {
    let token = req.headers['x-access-token'];

    if (token === undefined)
      token = req.query['x-access-token']

    let signd = jwt.verify(token, KEY);
    return signd;
  }
  catch {
    return null;
  }
}

export function getAuthentication(checkRole, throw401 = true) {  
  return (req, resp, next) => {
    try {
      let token = req.headers['x-access-token'];
  
      if (token === undefined)
        token = req.query['x-access-token'];
    
      let signd = jwt.verify(token, KEY);
    
      req.user = signd;
      if (checkRole && !checkRole(signd) && signd.role.type !== 'admin')
        return resp.status(403).end();
    
      next();
    }
    catch {
      if (throw401) {
        let error = new Error();
        error.stack = 'Authentication Error: JWT must be provided';
        resp.status(401).end();
      }
      else {
        next();
      }
    }
  }
}