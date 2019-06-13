const express = require('express');
const router = express.Router();

const { body } = require('express-validator/check');

// impotar el controlador
const proyectosController = require('../Controllers/proyectosController');

module.exports = () => {
    //Ruta para el home
    router.get('/', proyectosController.proyectosHome);
    router.get('/nuevo-proyecto', proyectosController.formularioProyecto);
    router.post('/nuevo-proyecto', 
        body('nombre').not().isEmpty().trim().escape(), proyectosController.nuevoProyecto
    );
    
    // Listar proyecto 
    router.get("/proyectos/:url", proyectosController.proyectoPorUrl);

    // Actualizar el proyecto
    router.get("/proyecto/editar/:id", proyectosController.formularioEditar);
    router.post('/nuevo-proyecto/:id', 
        body('nombre').not().isEmpty().trim().escape(), proyectosController.actualizarProyecto
    );

    // Eliminar proyecto
    router.delete('/proyectos/:url', proyectosController.eliminarProyecto);

    return router;
}


