// backend/index.js

// 📦 Carga variables de entorno desde .env (por ejemplo: SECRET_KEY, PORT)
// 📦 Carrega variáveis de ambiente do .env (ex: SECRET_KEY, PORT)
require('dotenv').config()

// 🚀 Importa los módulos principales del backend
// 🚀 Importa os principais módulos do backend
const express    = require('express')
const cors       = require('cors')
const bodyParser = require('body-parser')

// 🔗 Conexión con la base de datos, que se inicializa al importar 'db.js'
// 🔗 Conexão com o banco de dados, que é inicializado ao importar 'db.js'
const db = require('./db')

// 🛠️ Crea una instancia de aplicación Express
// 🛠️ Cria uma instância da aplicação Express
const app  = express()

// 📡 Define el puerto desde env o usa 3001 por defecto
// 📡 Define a porta a partir do .env ou usa 3001 como padrão
const PORT = process.env.PORT || 3001

// ====================
// 🧩 Middlewares
// ====================

// Habilita CORS solo para 'localhost:3000' y permite cookies/sesión (credentials)
// Habilita CORS apenas para 'localhost:3000' e permite cookies/sessão (credentials)
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true
  })
)

// Permite recibir datos en formato JSON en las solicitudes
// Permite receber dados no formato JSON nas requisições
app.use(bodyParser.json())

// ====================
// 🔀 Rutas / Routes
// ====================

// Módulo de autenticación y usuarios (registro, login)
// Módulo de autenticação e usuários (registro, login)
app.use('/users', require('./routes/users'))

// Módulo de beneficiarios (CRUD completo)
// Módulo de beneficiários (CRUD completo)
app.use('/beneficiarios', require('./routes/beneficiarios'))

// ====================
// ❤️ Health-check simple
// ====================

// Ruta raíz para verificar si la API está en línea
// Rota raiz para verificar se a API está online
app.get('/', (req, res) => res.send('API funcionando…'))

// ====================
// 🚀 Inicia el servidor
// ====================

// Inicia el servidor escuchando en el puerto definido
// Inicia o servidor escutando na porta definida
app.listen(PORT, () =>
  console.log(`🚀 Backend en http://localhost:${PORT}`)
)
