const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Ruta absoluta al archivo init.sql
const initSQL = fs.readFileSync(path.join(__dirname, 'db', 'init.sql'), 'utf8');

// Conexión y creación automática de base de datos y tablas
const db = new sqlite3.Database('./db/database.sqlite', (err) => {
  if (err) return console.error('❌ Erro ao conectar com SQLite', err.message);
  console.log('✅ SQLite conectado.');

  db.exec(initSQL, (err) => {
    if (err) return console.error('❌ Erro ao inicializar DB:', err.message);
    console.log('✅ Estrutura do banco verificada.');

    // Inserir usuário admin se não existir
    db.run(
      `INSERT OR IGNORE INTO users (username, email, password, role)
       VALUES ('admin', 'admin@admin.com', 'admin', 'admin')`,
      (err) => {
        if (err) return console.error('❌ Erro ao inserir admin:', err.message);
        console.log('✅ Usuário admin verificado/inserido.');
      }
    );
  });
});

// Rotas
const userRoutes = require('./routes/users');
const beneficiarioRoutes = require('./routes/beneficiarios');

app.use('/users', userRoutes);
app.use('/beneficiarios', beneficiarioRoutes);

// Teste de rota
app.get('/', (req, res) => {
  res.send('API funcionando...');
});

// Inicia servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor backend rodando em http://localhost:${PORT}`);
});
