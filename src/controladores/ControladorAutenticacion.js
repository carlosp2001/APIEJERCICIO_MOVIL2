
const { validationResult } = require('express-validator');
const MSJ = require('../componentes/mensajes');
const Usuario = require('../modelos/modeloUsuarios');
function validar(req) {
    const validaciones = validationResult(req);
    
    var errores = [];
    var error = {
        mensaje: '',
        parametro: ''
    };
    var msj = {
        estado: 'correcto',
        mensaje: 'Peticion ejecutada correctamente',
        datos: '',
        errores: ''
    };
    if (validaciones.errors.length > 0) {
        validaciones.errors.array.forEach(element => {
            error.mensaje = element.msg;
            error.parametro = element.param;
            errores.push(error);
        });
        msj.estado = 'precaucion';
        msj.mensaje = 'La peticion no se ejecuto';
        msj.errores = errores;
    }

    return msj;
};

exports.RecuperarContrasena = async (req, res) => {
    const msj = validar(req);
    if (msj.errores.length > 0) {
        MSJ(res, 200, msj);
    } else {
        try {
            const { correo } = req.body;
            const buscarUsuario = await Usuario.findOne({
                where: {
                    correo, correo
                }
            });
        } catch (error) {
            msj.estado = 'Precaucion';
            msj.mensaje = 'La peticion no se ejecuto';
            msj.errores = error;
            MSJ(res, 500, msj);

        }    
    }
};

