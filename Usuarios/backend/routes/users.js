const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const jwt = require('jsonwebtoken');

const db = new sqlite3.Database('./db/database.sqlite');
const SECRET_KEY = 'segredo_super_secreto'; // Puedes moverlo a un archivo .env

// Login: devuelve token si el usuario es válido
// Antes
router.get('/login', ...);

// Mejor:
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  db.get(
    'SELECT * FROM users WHERE username = ? AND password = ?',
    [username, password],
    (err, row) => {
      if (err) return res.status(500).json({ error: err.message });

      if (!row) {
        return res.status(401).json({ success: false, message: 'Credenciais inválidas' });
      }

      const token = jwt.sign(
        { id: row.id, username: row.username },
        SECRET_KEY,
        { expiresIn: '2h' }
      );

      res.json({ success: true, user: { id: row.id, username: row.username }, token });
    }
  );
});


// Registro de novo usuário
router.post('/register', (req, res) => {
  const { username, password } = req.body;

  db.run(
    'INSERT INTO users (username, password) VALUES (?, ?)',
    [username, password],
    function (err) {
      if (err) {
        return res.status(400).json({ success: false, message: 'Usuário já existe ou erro' });
      }
      res.status(201).json({ success: true, id: this.lastID });
    }
  );
});

module.exports = router;
