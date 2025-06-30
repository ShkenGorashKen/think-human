// backend/routes/beneficiarios.js

// Importa el módulo express y crea un enrutador para definir rutas.
// Importa o módulo express e cria um roteador para definir rotas.
const express = require('express')
const router  = express.Router()

// Importa el módulo de la base de datos (probablemente SQLite).
// Importa o módulo do banco de dados (provavelmente SQLite).
const db      = require('../db')

// GET /beneficiarios
// Recupera todos los beneficiarios desde la base de datos.
// Recupera todos os beneficiários do banco de dados.
router.get('/', (req, res) => {
  db.all('SELECT * FROM beneficiarios', [], (err, rows) => {
    if (err) {
      console.error('SQL GET ERROR:', err)
      // Error 500 si hay algún problema con la consulta SQL.
      // Erro 500 se houver algum problema com a consulta SQL.
      return res.status(500).json({ error: err.message })
    }
    // Devuelve todos los registros como JSON.
    // Retorna todos os registros como JSON.
    res.json(rows)
  })
})

// POST /beneficiarios
// Inserta un nuevo beneficiario en la base de datos.
// Insere um novo beneficiário no banco de dados.
router.post('/', (req, res) => {
  // Extrae los campos del cuerpo de la solicitud.
  // Extrai os campos do corpo da requisição.
  const {
    nombre, apellido, RG, fecha_nacimiento,
    direccion, email, telefono,
    tipoDeAjuda, situacaoSocial, user_id
  } = req.body

  // SQL para insertar los datos.
  // SQL para inserir os dados.
  const sql = `
    INSERT INTO beneficiarios
      (nombre, apellido, RG, fecha_nacimiento,
       direccion, email, telefono,
       tipoDeAjuda, situacaoSocial, user_id)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `

  // Parametros para evitar inyección SQL.
  // Parâmetros para evitar injeção SQL.
  const params = [
    nombre, apellido, RG, fecha_nacimiento,
    direccion, email, telefono,
    tipoDeAjuda, situacaoSocial,
    user_id || null // asigna null si no viene definido
  ]

  // Ejecuta la inserción.
  // Executa a inserção.
  db.run(sql, params, function(err) {
    if (err) {
      console.error('SQL POST ERROR:', err)
      return res.status(500).json({ error: err.message })
    }
    // Devuelve el ID del nuevo beneficiario creado.
    // Retorna o ID do novo beneficiário criado.
    res.status(201).json({ id: this.lastID })
  })
})

// PUT /beneficiarios/:id
// Actualiza un beneficiario existente por su ID.
// Atualiza um beneficiário existente pelo seu ID.
router.put('/:id', (req, res) => {
  const { id } = req.params

  const {
    nombre, apellido, RG, fecha_nacimiento,
    direccion, email, telefono,
    tipoDeAjuda, situacaoSocial
  } = req.body

  const sql = `
    UPDATE beneficiarios SET
      nombre = ?, apellido = ?, RG = ?, fecha_nacimiento = ?,
      direccion = ?, email = ?, telefono = ?,
      tipoDeAjuda = ?, situacaoSocial = ?
    WHERE id = ?
  `
  const params = [
    nombre, apellido, RG, fecha_nacimiento,
    direccion, email, telefono,
    tipoDeAjuda, situacaoSocial,
    id
  ]

  db.run(sql, params, function(err) {
    if (err) {
      console.error('SQL PUT ERROR:', err)
      return res.status(500).json({ error: err.message })
    }
    // Devuelve el número de registros afectados.
    // Retorna o número de registros afetados.
    res.json({ changes: this.changes })
  })
})

// DELETE /beneficiarios/:id
// Elimina un beneficiario por su ID.
// Remove um beneficiário pelo seu ID.
router.delete('/:id', (req, res) => {
  const { id } = req.params

  db.run('DELETE FROM beneficiarios WHERE id = ?', id, function(err) {
    if (err) {
      console.error('SQL DELETE ERROR:', err)
      return res.status(500).json({ error: err.message })
    }
    // Devuelve cuántos registros fueron eliminados.
    // Retorna quantos registros foram removidos.
    res.json({ changes: this.changes })
  })
})

// Exporta el router para usarlo en la app principal.
// Exporta o router para usá-lo na aplicação principal.
module.exports = router
