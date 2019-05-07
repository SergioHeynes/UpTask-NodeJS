exports.proyectosHome = (req, res) => {
    res.render("index", {nombrePagina: 'Proyecto'});
};

exports.formularioProyecto = (req, res) => {
    res.render("nuevo-proyecto", {nombrePagina: 'Proyecto'});
};

exports.nuevoProyecto = (req, res) => {
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
        });
    }

    

};
