# Think Human Foundation – Gestor CRUD de Beneficiarios

Aplicación web fullstack desarrollada con **React + Express + SQLite** que permite gestionar personas beneficiarias de programas sociales. Proporciona una interfaz amigable y segura para realizar operaciones **CRUD** completas.

---

## ✨ Funcionalidades principales / Funcionalidades principais

### 🇪🇸 Español

✅ **Gestión CRUD de beneficiarios**:

- **Crear** beneficiarios desde formularios personalizados.
- **Leer** todos los registros desde una tabla interactiva.
- **Actualizar** datos en línea mediante edición dinámica.
- **Eliminar** beneficiarios con confirmación.

🔐 **Autenticación segura**: Login y registro con JWT.

📊 **Dashboard visual**: Gráficos por tipo de ayuda y situación social.

🔄 **Persistencia**: Datos almacenados localmente en SQLite.

📦 **Interfaz moderna**: Diseñada con Tailwind, toast de mensajes y navegación fluida.

---

### 🇧🇷 Português

✅ **CRUD completo de beneficiários**:

- **Criar** beneficiários com formulários personalizados.
- **Ler** todos os registros em uma tabela interativa.
- **Atualizar** dados com edição dinâmica.
- **Excluir** beneficiários com confirmação visual.

🔐 **Autenticação segura**: Login e cadastro com JWT.

📊 **Dashboard visual**: Gráficos por tipo de ajuda e situação social.

🔄 **Persistência**: Dados armazenados localmente com SQLite.

🎨 **Interface moderna**: Estilizada com Tailwind, toasts e navegação fluida.

---

## 🧱 Tecnologías utilizadas

- **Frontend**: React, React Router, Tailwind CSS, Recharts, React Toastify
- **Backend**: Express.js, SQLite3, JWT, bcryptjs
- **Comunicación**: Interceptores Axios con token JWT automático

---

## 🗂️ Estructura del código

📦 backend ┣ 📄 index.js ← servidor Express ┣ 📂 routes/ ← rutas users y beneficiarios (CRUD) 
┣ 📂 middleware/ ← autenticación con JWT ┗ 📄 db.js ← conexión + inicialización con init.sql

📦 src/ ┣ 📄 App.jsx ← rutas y lógica de sesión ┣ 📂 screens/ ← pantallas funcionales (Login, Dashboard, 
Beneficiarios) ┣ 📂 components/ ← Navbar, Footer, Spinner... ┣ 📂 services/ ← api.js con interceptores 
┗ 📄 index.jsx ← punto de entrada