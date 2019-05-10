const express = require('express');
const router = express.Router();

const { body } = require('express-validator/check');

// impotar el controlador
const proyectosController = require('../Controlles/proyectosController');

module.exports = () => {
    //Ruta para el home
    router.get('/', proyectosController.proyectosHome);
    router.get('/nuevo-proyecto', proyectosController.formularioProyecto);
    router.post('/nuevo-proyecto', 
        body('nombre').not().isEmpty().trim().escape(), proyectosController.nuevoProyecto);
    return router;
}