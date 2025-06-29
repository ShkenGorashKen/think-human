-- Tabela de usuários
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL
);

-- Tabela de beneficiários
CREATE TABLE IF NOT EXISTS beneficiarios (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL,
  idade INTEGER,
  email TEXT,
  telefone TEXT,
  tipoDeAjuda TEXT,
  situacaoSocial TEXT
);

-- Inserir beneficiário de exemplo
INSERT INTO beneficiarios (nome, idade, email, telefone, tipoDeAjuda, situacaoSocial)
VALUES (
  'Maria da Silva',
  35,
  'maria@example.com',
  '11999999999',
  'Cesta básica',
  'Vulnerabilidade alta'
);