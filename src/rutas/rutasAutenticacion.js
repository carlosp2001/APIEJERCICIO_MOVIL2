const {Router} = require('express');
const {body, query} = require('express-validator');

const controladroAutenticacion = require('../controladores/ControladorAutenticacion');
const rutas = Router();
rutas.post('/recuperar',
    body('correo')
        .notEmpty().withMessage('No se aaceptan valores vacios para el correo')
        .isEmail().withMessage('El correo debe ser valido'),
    controladroAutenticacion.RecuperarContrasena);

module.exports = rutas;