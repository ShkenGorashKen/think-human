const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const db = new sqlite3.Database('./db/database.sqlite');
const SECRET_KEY = 'segredo_super_secreto'; // 💡 Puedes mover esto a .env

// 🔐 LOGIN
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  db.get('SELECT * FROM users WHERE username = ?', [username], async (err, user) => {
    if (err) return res.status(500).json({ error: err.message });

    if (!user) {
      return res.status(401).json({ success: false, message: 'Credenciais inválidas' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: 'Senha incorreta' });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      SECRET_KEY,
      { expiresIn: '2h' }
    );

    res.json({
      success: true,
      user: { id: user.id, username: user.username },
      token
    });
  });
});

// 📝 REGISTRO
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ success: false, message: 'Campos obrigatórios' });

  // Verifica se usuário já existe
  db.get('SELECT * FROM users WHERE username = ?', [username], async (err, row) => {
    if (err) return res.status(500).json({ success: false, message: 'Erro no servidor' });

    if (row) {
      return res.status(400).json({ success: false, message: 'Usuário já existe' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    db.run(
      'INSERT INTO users (username, password) VALUES (?, ?)',
      [username, hashedPassword],
      function (err) {
        if (err) {
          return res.status(500).json({ success: false, message: 'Erro ao registrar' });
        }

        const token = jwt.sign(
          { id: this.lastID, username },
          SECRET_KEY,
          { expiresIn: '2h' }
        );

        res.status(201).json({
          success: true,
          user: { id: this.lastID, username },
          token
        });
      }
    );
  });
});

module.exports = router;
