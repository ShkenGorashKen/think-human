// backend/middleware/auth.js
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'segredo_super_secreto';

function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // "Bearer TOKEN"

  if (!token) return res.status(401).json({ error: 'Token não fornecido' });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ error: 'Token inválido' });
    req.user = user; // ahora tienes req.user disponible
    next();
  });
}

module.exports = authMiddleware;
