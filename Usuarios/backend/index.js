const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

// Inicializa banco se necessário
const db = new sqlite3.Database('./db/database.sqlite', (err) => {
  if (err) return console.error('Erro ao conectar com SQLite', err.message);
  console.log('SQLite conectado.');
});

const initSQL = fs.readFileSync('./db/init.sql', 'utf8');
db.exec(initSQL, (err) => {
  if (err) console.error('Erro ao inicializar DB:', err.message);

  // Inserir usuário admin se não existir
  db.run(
    'INSERT OR IGNORE INTO users (username, password) VALUES (?, ?)',
    ['admin', 'admin'],
    function (err) {
      if (err) {
        console.error('Erro ao inserir usuário admin:', err.message);
      } else {
        console.log('Usuário admin verificado/inserido.');
      }
    }
  );
});

// Importa rotas
const userRoutes = require('./routes/users');
const beneficiarioRoutes = require('./routes/beneficiarios');

app.use('/users', userRoutes);
app.use('/beneficiarios', beneficiarioRoutes);

// Rota padrão
app.get('/', (req, res) => {
  res.send('API funcionando...');
});

app.listen(PORT, () => {
  console.log(`Servidor backend rodando: http://localhost:${PORT}`);
});
