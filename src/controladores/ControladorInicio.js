exports.Inicio = (req, res) =>{
    const listaModulos = [
        {modulo: "empleados", ruta: "api/empleados"},
        {modulo: "clientes", ruta: "api/clientes"},  

    ];
    const msj = {
        api:"API-SIGRES",
        descripcion:"Interfaz de programacion para el Sistema de Gestion de restaurantes",
        propietario:"DESOFIW",
        desarrollador: "Carlos Pineda",
        colaboradores:""
    };
    res.json(msj);
}

exports.Otra = (req, res) =>{
    res.send("Otra ruta");
}