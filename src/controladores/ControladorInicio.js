const {validationResult} = require('express-validator');

exports.Inicio = (req, res) =>{
    const listaModulos = [
        {modulo: "empleados", ruta: "/api/empleados"},
        {modulo: "clientes", ruta: "/api/clientes"},  

    ];
    const msj = {
        api:"API-SIGRES",
        descripcion:"Interfaz de programacion para el Sistema de Gestion de restaurantes",
        propietario:"DESOFIW",
        desarrollador: "Carlos Pineda",
        colaboradores:"",
        listaModulos,
    };
    res.json(msj);
}

exports.EjemploPost = (req, res) =>{
    // console.log(req.body);
    const validaciones = validationResult(req);
    console.log(validaciones.errors);
    //const {usuario, contrasena} = req.body;
    const usuario = req.body.usuario;
    const contrasena = req.body.contrasena;
    console.log(usuario);
    console.log(contrasena);
    const msj  = {
        mensaje: "Ninguno"
    };
    if (!usuario || !contrasena){
        msj.mensaje = 'Debe enviar los datos completos';
    }
    else{
        msj.mensaje = 'Peticion Procesada correctamente';
    }

    res.json(msj.mensaje);
}

exports.EjemploPut = (req, res) =>{
    const {id} = req.query;
    const validaciones = validationResult(req);
    console.log(validaciones.errors);
    console.log(req);
    // console.log(req.body);

    //const {usuario, contrasena} = req.body;
    const usuario = req.body.usuario;
    const contrasena = req.body.contrasena;
    console.log(usuario);
    console.log(contrasena);
    const msj  = {
        mensaje: "Ninguno"
    };
    if (!usuario || !contrasena){
        msj.mensaje = 'Debe enviar los datos completos';
    }
    else{
        msj.mensaje = 'Peticion Procesada correctamente';
    }

    res.json(msj.mensaje);
}

exports.EjemploDelete = (req, res) =>{
    const {id} = req.query;
    const validaciones = validationResult(req);
    console.log(validaciones.errors);
    const msj  = {
        mensaje: "Ninguno"
    };
    if (!id){
        msj.mensaje = 'Debe enviar los datos completos';
    }
    else{
        msj.mensaje = 'Peticion Procesada correctamente';
    }

    res.json(msj);
}