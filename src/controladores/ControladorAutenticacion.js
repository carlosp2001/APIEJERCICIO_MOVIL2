
const { validationResult } = require('express-validator');
const MSJ = require('../componentes/mensajes');
const correo = require('../configuraciones/correo')
const Usuario = require('../modelos/modeloUsuarios');
const EnviarCorreo = require('../configuraciones/correo');
const gpc = require('generate-pincode');
const { Op } = require('sequelize');

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
            var buscarUsuario = await Usuario.findOne({
                where: {
                    correo, correo
                }
            });
            if (buscarUsuario) {
                const pin = gpc(4);
                buscarUsuario.pin = pin;
                await buscarUsuario.save();
                const data = {
                    pin,
                    correo
                };
                EnviarCorreo.RecuperarContrasena(data);
                estado = 'correcto';
                mensaje = 'Peticion ejecutada correctamente';
                datos = '';
                errores = '';
                MSJ(res, 200, msj);
            }
            else {
                msj.estado = 'precaucion';
                msj.mensaje = 'El id de registro de usuario no existe';
                msj.errores = {
                    mensaje: 'El correo no existe o no esta vinculado a ningun usuario',
                    parametro: 'correo'
                }
                MSJ(res, 200, msj);
            }
        } catch (error) {
            msj.estado = 'Precaucion';
            msj.mensaje = 'La peticion no se ejecuto';
            msj.errores = error;
            MSJ(res, 500, msj);
        }    
    }
};

exports.IniciarSesion = async (req, res) => {
    const msj = validar(req);
    if (msj.errores.length > 0) {
        MSJ(res, 200, msj);
    } else {
        try {
            const { usuario } = req.body;
            var buscarUsuario = await Usuario.findOne({
                where: {
                    [Op.or]: [{correo: usuario}, {login: usuario}]
                  }
            });
            if (buscarUsuario) {
                const pin = gpc(4);
                buscarUsuario.pin = pin;
                await buscarUsuario.save();
                const data = {
                    pin,
                    correo
                };
                EnviarCorreo.RecuperarContrasena(data);
                estado = 'correcto';
                mensaje = 'Peticion ejecutada correctamente';
                datos = '';
                errores = '';
                MSJ(res, 200, msj);
            }
            else {
                msj.estado = 'precaucion';
                msj.mensaje = 'El id de registro de usuario no existe';
                msj.errores = {
                    mensaje: 'El correo no existe o no esta vinculado a ningun usuario',
                    parametro: 'correo'
                }
                MSJ(res, 200, msj);
            }
        } catch (error) {
            msj.estado = 'Precaucion';
            msj.mensaje = 'La peticion no se ejecuto';
            msj.errores = error;
            MSJ(res, 500, msj);
        }    
    }
};