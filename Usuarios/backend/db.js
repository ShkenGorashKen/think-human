// backend/db.js

// Importa el módulo sqlite3 con soporte extendido (verbose).
// Importa o módulo sqlite3 com suporte estendido (verbose).
const sqlite3 = require('sqlite3').verbose()

// Importa el sistema de archivos para leer archivos locales.
// Importa o sistema de arquivos para ler arquivos locais.
const fs      = require('fs')

// Importa path para manejar rutas de forma multiplataforma.
// Importa path para lidar com caminhos de forma multiplataforma.
const path    = require('path')

// 🗃️ Lee el contenido del archivo init.sql que contiene las sentencias para crear o actualizar la base de datos.
// 🗃️ Lê o conteúdo do arquivo init.sql que contém os comandos para criar ou atualizar o banco de dados.
const initSQL = fs.readFileSync(
  path.join(__dirname, 'db', 'init.sql'),
  'utf8'
)

// 📁 Define la ubicación del archivo SQLite donde se almacenarán los datos.
// 📁 Define a localização do arquivo SQLite onde os dados serão armazenados.
const dbFile = path.join(__dirname, 'db', 'database.sqlite')

// 🔌 Abre la base de datos (crea el archivo si no existe) y ejecuta el SQL de inicialización.
// 🔌 Abre o banco de dados (cria o arquivo se não existir) e executa o SQL de inicialização.
const db = new sqlite3.Database(dbFile, err => {
  if (err) {
    // ❌ Si hay error al conectar, muestra el mensaje y detiene la app.
    // ❌ Se houver erro ao conectar, mostra a mensagem e encerra o app.
    console.error('❌ Error al conectar SQLite:', err.message)
    process.exit(1)
  }

  // ✅ Conexión exitosa.
  // ✅ Conexão bem-sucedida.
  console.log('✅ SQLite conectado en', dbFile)

  // ⚙️ Ejecuta las sentencias SQL (ej.: CREATE TABLE ...) del archivo de inicialización.
  // ⚙️ Executa os comandos SQL (ex.: CREATE TABLE ...) do arquivo de inicialização.
  db.exec(initSQL, err2 => {
    if (err2) {
      console.error('❌ Error al inicializar BD:', err2.message)
      process.exit(1)
    }
    // 📐 Confirmación de que la estructura está lista.
    // 📐 Confirmação de que a estrutura está pronta.
    console.log('✅ Estructura de la BD verificada/inicializada')
  })
})

// Exporta la instancia de conexión para usarla en otras partes del proyecto.
// Exporta a instância da conexão para usá-la em outras partes do projeto.
module.exports = db
