const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./db/database.sqlite');
const SECRET_KEY = 'segredo_super_secreto'; // Usa la misma que en el middleware

// Registro de usuario
router.post('/register', (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Por favor complete todos los campos' });
  }

  db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
    if (err) return res.status(500).json({ error: 'Erro no banco de dados' });
    if (row) return res.status(400).json({ error: 'Email já cadastrado' });

    bcrypt.hash(password, 10, (err, hash) => {
      if (err) return res.status(500).json({ error: 'Erro ao encriptar senha' });

      const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
      db.run(sql, [username, email, hash], function(err) {
        if (err) return res.status(500).json({ error: 'Erro ao salvar usuário' });

        const token = jwt.sign({ id: this.lastID, email }, SECRET_KEY, { expiresIn: '24h' });

        res.json({
          message: 'Usuário registrado com sucesso',
          token,
          user: { id: this.lastID, username, email }
        });
      });
    });
  });
});

// Login de usuario
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Por favor complete todos los campos' });
  }

  db.get('SELECT * FROM users WHERE email = ?', [email], (err, user) => {
    if (err) return res.status(500).json({ error: 'Erro no banco de dados' });
    if (!user) return res.status(401).json({ error: 'Email ou senha inválidos' });

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) return res.status(500).json({ error: 'Erro ao verificar senha' });
      if (!isMatch) return res.status(401).json({ error: 'Email ou senha inválidos' });

      const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '24h' });

      res.json({
        message: 'Login efetuado com sucesso',
        token,
        user: { id: user.id, username: user.username, email: user.email }
      });
    });
  });
});

module.exports = router;
