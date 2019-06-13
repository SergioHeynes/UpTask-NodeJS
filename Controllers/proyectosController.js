const Proyectos = require('../models/Proyectos');

exports.proyectosHome = async (req, res) => {
    const proyectos = await Proyectos.findAll();
    res.render("index", {
        nombrePagina: 'Proyectos', 
        proyectos
    });
};

exports.formularioProyecto = async (req, res) => {
    const proyectos = await Proyectos.findAll();

    res.render("nuevo-proyecto", {
        nombrePagina: 'Nuevo proyecto', 
        proyectos
    });
};

exports.nuevoProyecto = async (req, res) => {
    const proyectos = await Proyectos.findAll();

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
            errores,
            proyectos
        })
    } else {
        await Proyectos.create({ nombre });
            res.redirect("/");
    }
};

exports.proyectoPorUrl = async (req, res, next) => {
    
    const proyectosPromise = await Proyectos.findAll();

    const proyectoPromise = await Proyectos.findOne({
        where: {
            url: req.params.url
        }
    });

    const [proyectos, proyecto] = await Promise.all([proyectosPromise, proyectoPromise]);

    if(!proyecto) return next();

    res.render("tareas", {
        nombrePagina: 'Tareas del proyecto',
        proyecto,
        proyectos
    });
}

exports.formularioEditar = async (req, res) => {

    const proyectosPromise = await Proyectos.findAll();

    const proyectoPromise = await Proyectos.findOne({
        where: {
            id: req.params.id
        }
    });

    const [proyectos, proyecto] = await Promise.all([proyectosPromise, proyectoPromise]);

    //render a la vista
    res.render('nuevo-Proyecto', {
        nombrePagina: 'Editar Proyecto',
        proyectos,
        proyecto
    });
}

exports.actualizarProyecto = async (req, res) => {
    const proyectos = await Proyectos.findAll();

    const { nombre } = req.body;

    let errores = [];

    if(!nombre) {
        errores.push({'texto': 'Agrega un nombre al proyecto'});
        console.log(errores);
    }

    if(errores.length > 0) {
        res.render("nuevo-proyecto", {
            nombrePagina: "Nuevo proyecto", 
            errores,
            proyectos
        })
    } else {
        await Proyectos.update(
            { nombre: nombre },
            { where: { id: req.params.id }}
        );
        res.redirect("/");
    }
}

exports.eliminarProyecto = async (req, res, next) => {
    const {urlProyecto} = req.query;

    const resultado = await Proyectos.destroy({where: { url : urlProyecto}});

    if(!resultado) {
        return next();
    }
    res.status(200).send("Proyecto eliminado correctamente.")
}

