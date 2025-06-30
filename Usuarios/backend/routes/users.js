// backend/routes/users.js

// Importa el módulo Express y crea un enrutador.
// Importa o módulo Express e cria um roteador.
const express = require('express')
const router  = express.Router()

// Importa bcrypt para cifrar contraseñas.
// Importa bcrypt para criptografar senhas.
const bcrypt  = require('bcryptjs')

// Importa jsonwebtoken para generar tokens JWT.
// Importa jsonwebtoken para gerar tokens JWT.
const jwt     = require('jsonwebtoken')

// Conexión con la base de datos (SQLite probablemente).
// Conexão com o banco de dados (provavelmente SQLite).
const db = require('../db')

// Carga la clave secreta desde las variables de entorno (.env).
// Carrega a chave secreta das variáveis de ambiente (.env).
const SECRET_KEY = process.env.SECRET_KEY

// 📌 Registro de usuarios (POST /register)
// 📌 Registro de usuários (POST /register)
router.post('/register', (req, res) => {
  const { username, email, password } = req.body

  // Verifica que todos los campos estén presentes.
  // Verifica se todos os campos estão presentes.
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Complete todos los campos' })
  }

  // Busca si ya existe un usuario con ese email.
  // Verifica se já existe um usuário com esse email.
  db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
    if (err) return res.status(500).json({ error: 'Error en la BD' })
    if (row) return res.status(400).json({ error: 'Email ya registrado' })

    // Hashea la contraseña antes de guardarla.
    // Criptografa a senha antes de salvá-la.
    bcrypt.hash(password, 10, (err2, hash) => {
      if (err2) return res.status(500).json({ error: 'Error al encriptar' })

      const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)'
      db.run(sql, [username, email, hash], function(err3) {
        if (err3) return res.status(500).json({ error: 'Error al guardar usuario' })

        // Crea un token JWT con el ID y email del nuevo usuario.
        // Cria um token JWT com o ID e email do novo usuário.
        const payload = { id: this.lastID, email }
        const token   = jwt.sign(payload, SECRET_KEY, { expiresIn: '24h' })

        // Devuelve el usuario creado y el token.
        // Retorna o usuário criado e o token.
        res.json({
          message: 'Usuario registrado con éxito',
          token,
          user: { id: this.lastID, username, email }
        })
      })
    })
  })
})

// 🔐 Login de usuarios (POST /login)
// 🔐 Login de usuários (POST /login)
router.post('/login', (req, res) => {
  const { email, password } = req.body

  // Valida que los campos no estén vacíos.
  // Valida que os campos não estejam vazios.
  if (!email || !password) {
    return res.status(400).json({ error: 'Complete todos los campos' })
  }

  // Busca al usuario por su email.
  // Busca o usuário pelo email.
  db.get('SELECT * FROM users WHERE email = ?', [email], (err, user) => {
    if (err) return res.status(500).json({ error: 'Error en la BD' })
    if (!user) return res.status(401).json({ error: 'Credenciales inválidas' })

    // Compara la contraseña ingresada con la guardada.
    // Compara a senha digitada com a armazenada.
    bcrypt.compare(password, user.password, (err2, isMatch) => {
      if (err2) return res.status(500).json({ error: 'Error al comparar' })
      if (!isMatch) return res.status(401).json({ error: 'Credenciales inválidas' })

      // Genera un token si las credenciales son válidas.
      // Gera um token se as credenciais forem válidas.
      const payload = { id: user.id, email: user.email }
      const token   = jwt.sign(payload, SECRET_KEY, { expiresIn: '24h' })

      // Devuelve el token y los datos del usuario.
      // Retorna o token e os dados do usuário.
      res.json({
        message: 'Login exitoso',
        token,
        user: { id: user.id, username: user.username, email: user.email }
      })
    })
  })
})

// Exporta el enrutador para usarlo en otras partes.
// Exporta o roteador para ser usado em outras partes.
module.exports = router
