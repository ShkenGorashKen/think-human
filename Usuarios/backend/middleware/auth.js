// backend/middleware/auth.js

// Importa el módulo 'jsonwebtoken' que permite trabajar con tokens JWT.
// Importa o módulo 'jsonwebtoken' que permite trabalhar com tokens JWT.
const jwt = require('jsonwebtoken');

// Clave secreta usada para firmar y verificar los tokens JWT.
// Chave secreta usada para assinar e verificar os tokens JWT.
const SECRET_KEY = 'segredo_super_secreto';

// Middleware de autenticación que protege las rutas verificando si el token JWT es válido.
// Middleware de autenticação que protege as rotas verificando se o token JWT é válido.
function authMiddleware(req, res, next) {
  // Extrae el encabezado Authorization del request (ejemplo: "Bearer token").
  // Extrai o cabeçalho Authorization da requisição (exemplo: "Bearer token").
  const authHeader = req.headers['authorization'];

  // Obtiene el token dividiendo el valor del encabezado y extrayendo la segunda parte.
  // Obtém o token dividindo o valor do cabeçalho e extraindo a segunda parte.
  const token = authHeader && authHeader.split(' ')[1]; // "Bearer TOKEN"

  // Si no hay token, devuelve un error 401 (no autorizado).
  // Se não houver token, retorna erro 401 (não autorizado).
  if (!token) return res.status(401).json({ error: 'Token não fornecido' });

  // Verifica la validez del token con la clave secreta.
  // Verifica a validade do token com a chave secreta.
  jwt.verify(token, SECRET_KEY, (err, user) => {
    // Si el token no es válido, devuelve error 403 (prohibido).
    // Se o token não for válido, retorna erro 403 (proibido).
    if (err) return res.status(403).json({ error: 'Token inválido' });

    // Si todo está bien, guarda los datos del usuario extraídos del token en req.user.
    // Se estiver tudo certo, salva os dados do usuário extraídos do token em req.user.
    req.user = user;

    // Llama a la siguiente función/middleware.
    // Chama a próxima função/middleware.
    next();
  });
}

// Exporta el middleware para que pueda ser usado en otras partes del proyecto.
// Exporta o middleware para que possa ser usado em outras partes do projeto.
module.exports = authMiddleware;
