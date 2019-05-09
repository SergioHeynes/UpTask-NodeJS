const express = require('express');
const routes = require('./routes');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

// Crear la conexión con la base de datos
const db = require('./config/db');

//importar el modelo
require('./models/Proyectos');

db.sync()
    .then(() => console.log('Conectado al servidor'))
    .catch((error) => console.log(error));

app.set('view engine', 'pug');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', routes());

app.set('views', path.join(__dirname, './views'));

app.listen(3000, () => {
    console.log("Server started on port 3000");
});