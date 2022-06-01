const {validationResult} = require('express-validator');
const modeloUsuario = require('../modelos/modeloUsuarios');

exports.Listar = async (req, res) => {
    try {
        const lista = await modeloUsuario.findAll();
        console.log(lista);
        res.json(lista);
    } catch (error) {
        console.error(error);
        res.json(error);
    }
};

exports.Guardar = async (req, res) => {
    // console.log(req.body);
    const validaciones = validationResult(req);
    console.log(validaciones.errors);
    const msj = {
        mensaje: ' '
    };
    if (validaciones.errors.length > 0) {
        validaciones.errors.array.forEach(element => {
            msj.mensaje += element.msg + '. ';
            
        });
        console.log(msj);
    }
    else {
        const { loginUsuario, empleadoUsuario, contrasenaUsuario, accesototalUsuario, habilitadoUsuario, pinUsuario, fallidosUsuario, correoUsuario, estadoUsuario} = req.body;
        try {
            var uniqueIdEmpleado = await modeloUsuario.findOne({
                where: {
                    empleado: empleadoUsuario
                }
            });
            var uniqueLogin = await modeloUsuario.findOne({
                where: {
                    login: loginUsuario
                }
            });
            var uniqueMail = await modeloUsuario.findOne({
                where: {
                    correo: correoUsuario
                }
            });
            if (uniqueLogin) {
                msj.mensaje = 'El login ya existe';
            } else if (uniqueMail) {
                msj.mensaje = 'El correo ya existe';
            } else if (uniqueIdEmpleado) {
                msj.mensaje = "El id de empleado ya existe";
            } else{
                await modeloUsuario.create(
                    {
                        login: loginUsuario,
                        empleado: empleadoUsuario,
                        contrasena: contrasenaUsuario,
                        accesototal: accesototalUsuario,
                        habilitado: habilitadoUsuario,
                        pin: pinUsuario,
                        fallidos: fallidosUsuario,
                        correo: correoUsuario,
                        estado: estadoUsuario
                    }
                );
                msj.mensaje = 'Registro almacenado'
            }
            } catch (error) {
                msj.mensaje = 'Error al guardar los datos';
            
            }
        
       
            
        
    }

    res.json(msj);
    
   
};

exports.Editar = async (req, res) =>{
    const validaciones = validationResult(req);
    console.log(validaciones.errors);
    const msj = {
        mensaje: ' '
    };
    if (validaciones.errors.length > 0) {
        // validaciones.errors.array.forEach(element => {
        //     msj.mensaje += element.msg + '. ';
        // });
    }
    else {
        const idUsuario = req.query.id;
        const { loginUsuario, empleadoUsuario, contrasenaUsuario, accesototalUsuario, habilitadoUsuario, pinUsuario, fallidosUsuario, correoUsuario, estadoUsuario } = req.body;
        try {
            var buscarUsuario = await modeloUsuario.findOne({
                where: {
                    id: idUsuario
                }
            });
            
            if (!buscarUsuario) {
                msj.mensaje = 'El id de registro no existe';
            } else {
                var uniqueIdEmpleado = await modeloUsuario.findOne({
                    where: {
                        empleado: empleadoUsuario
                    }
                });
                var uniqueLogin = await modeloUsuario.findOne({
                    where: {
                        login: loginUsuario
                    }
                });
                var uniqueMail = await modeloUsuario.findOne({
                    where: {
                        correo: correoUsuario
                    }
                });
                if (uniqueLogin) {
                    msj.mensaje = 'El login ya existe';
                } else if (uniqueMail) {
                    msj.mensaje = 'El correo ya existe';
                } else if (uniqueIdEmpleado) {
                    msj.mensaje = "El id de empleado ya existe";
                } else {
                    buscarUsuario.login = loginUsuario;
                    buscarUsuario.empleado = empleadoUsuario;
                    buscarUsuario.contrasena = contrasenaUsuario;
                    buscarUsuario.accesototal = accesototalUsuario;
                    buscarUsuario.habilitado = habilitadoUsuario;
                    buscarUsuario.pinUsuario = pinUsuario;
                    buscarUsuario.fallidos = fallidosUsuario;
                    buscarUsuario.correo = correoUsuario;
                    buscarUsuario.estado = estadoUsuario;
                    await buscarUsuario.save();
                    msj.mensaje = 'Registro Almacenado';
                }
            }
        } catch (error) {
            msj.mensaje = 'Error al guardar los datos';
            
        }
    }
    res.json(msj);
}


exports.Eliminar = async (req, res) =>{
    const idUsuario = req.query.id;
    const validaciones = validationResult(req);
    console.log(validaciones.errors);
    const msj  = {
        mensaje: "Ninguno"
    };
    if (!idUsuario){
        msj.mensaje = 'Debe enviar los datos completos';
    }
    else {
        var eliminarUsuario = await modeloUsuario.destroy({
            where: {
                id: idUsuario
            }
        });
        if (eliminarUsuario) {
            msj.mensaje = 'Peticion Procesada correctamente';    
        } else {
            msj.mensaje = 'No se pudo realizar la operacion'; 
        }
    }    
    res.json(msj);
    }
