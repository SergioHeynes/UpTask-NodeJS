const Proyectos = require('../models/Proyectos');

exports.proyectosHome = async (req, res) => {
    const proyectos = await Proyectos.findAll();
    res.render("index", {nombrePagina: 'Proyecto', proyectos});
};

exports.formularioProyecto = (req, res) => {
    res.render("nuevo-proyecto", {nombrePagina: 'Proyecto'});
};

exports.nuevoProyecto = async (req, res) => {
    const { nombre } = req.body;
    
    console.log(nombre);

    let errores = [];

    if(!nombre) {
        errores.push({'texto': 'Agrega un nombre al proyecto'});
        console.log(errores);
    }

    if(errores.length > 0) {
        res.render("nuevo-proyecto", {
            nombrePagina: "Nuevo proyecto", 
            errores
        })
    } else {
        const proyecto = await Proyectos.create({ nombre });
            res.redirect("/");
    }
    

};

