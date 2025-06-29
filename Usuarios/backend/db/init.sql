-- Tabla beneficiarios
CREATE TABLE beneficiarios (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre TEXT NOT NULL,
  apellido TEXT NOT NULL,
  RG TEXT UNIQUE,
  fecha_nacimiento DATE,
  direccion TEXT,
  email TEXT,
  telefono TEXT,
  tipoDeAjuda TEXT,
  situacaoSocial TEXT,
  user_id INTEGER, -- usuario que creó este beneficiario
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Tabla users
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  role TEXT DEFAULT 'user',  -- para diferenciar admin y usuarios normales
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
