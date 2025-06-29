const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./db/database.sqlite');
const SECRET_KEY = 'segredo_super_secreto'; // Usa la misma que en el middleware

router.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Por favor complete todos los campos' });
  }

  // Verificar si email ya existe
  db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
    if (err) return res.status(500).json({ error: 'Erro no banco de dados' });
    if (row) return res.status(400).json({ error: 'Email já cadastrado' });

    // Encriptar senha
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) return res.status(500).json({ error: 'Erro ao encriptar senha' });

      // Insertar usuario
      const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
      db.run(sql, [name, email, hash], function(err) {
        if (err) return res.status(500).json({ error: 'Erro ao salvar usuário' });

        // Crear token JWT
        const token = jwt.sign({ id: this.lastID, email }, SECRET_KEY, { expiresIn: '24h' });

        res.json({
          message: 'Usuário registrado com sucesso',
          token,
          user: { id: this.lastID, name, email }
        });
      });
    });
  });
});

module.exports = router;
