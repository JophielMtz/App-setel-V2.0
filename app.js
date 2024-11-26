const express = require('express');
const path = require('path');
const multer = require('multer');
const expressLayouts = require('express-ejs-layouts');
const db = require('./src/config/db'); 

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'uploads')); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); 
  }
});

const upload = multer({ storage: storage });

const app = express();

// Configuración del motor de vistas y layout
app.set('view engine', 'ejs');
app.use(expressLayouts);

// Middleware para procesar datos del formulario y JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Definir rutas de la API antes de los archivos estáticos
const apiRoutes = require('./routes/router');
app.use('/api', apiRoutes);

// Middleware para servir archivos estáticos después de las rutas de la API
app.use(express.static(path.join(__dirname, 'public'))); 
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => {
  res.redirect('/login'); 
});


module.exports = { app, upload };

const router = require('./routes/router');
app.use(router);

app.listen(3000, () => {
  console.log('server up running in http://localhost:3000/');
});


