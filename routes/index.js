const express = require('express');
const router = express.Router();

// impotar el controlador
const proyectosController = require('../Controlles/proyectosController');

module.exports = () => {
    //Ruta para el home
    router.get('/', proyectosController.proyectosHome);
    router.get('/nuevo-proyecto', proyectosController.formularioProyecto);
    router.post('/nuevo-proyecto', proyectosController.nuevoProyecto);
    

    return router;
}