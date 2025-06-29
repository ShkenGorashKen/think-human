const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'segredo_super_secreto';
// Conectar ao banco de dados SQLite

const db = new sqlite3.Database('./db/database.sqlite');

// Listar todos
router.get('/', (req, res) => {
  db.all('SELECT * FROM beneficiarios', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Criar novo
router.post('/', (req, res) => {
  const { nome, idade, email, telefone, tipoDeAjuda, situacaoSocial } = req.body;
  db.run(
    `INSERT INTO beneficiarios (nome, idade, email, telefone, tipoDeAjuda, situacaoSocial)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [nome, idade, email, telefone, tipoDeAjuda, situacaoSocial],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: this.lastID });
    }
  );
});

// Atualizar existente
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const { nome, idade, email, telefone, tipoDeAjuda, situacaoSocial } = req.body;
  db.run(
    `UPDATE beneficiarios SET nome = ?, idade = ?, email = ?, telefone = ?, tipoDeAjuda = ?, situacaoSocial = ?
     WHERE id = ?`,
    [nome, idade, email, telefone, tipoDeAjuda, situacaoSocial, id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true });
    }
  );
});

// Deletar
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  db.run('DELETE FROM beneficiarios WHERE id = ?', id, function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

function autenticarToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // formato: Bearer token

  if (!token) return res.status(401).json({ message: 'Token não fornecido' });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: 'Token inválido ou expirado' });

    req.user = user; // usuario decodificado
    next();
  });
}
router.use(autenticarToken);


module.exports = router;
