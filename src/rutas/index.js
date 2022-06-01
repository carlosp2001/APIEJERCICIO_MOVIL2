const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorInicio = require('../controladores/ControladorInicio');
const rutas = Router();
rutas.get('/', controladorInicio.Inicio);

rutas.post('/',
body('usuario')
.notEmpty().withMessage("No se aceptan valores vacios para el Usuario")
.isLength({min:3}).withMessage("La cantidad minima de caracteres es 3 para el nombre de usuario"),
body('contrasena').notEmpty().withMessage("No se aceptan valores vacios para la contrasena")
.isLength({min:6}).withMessage("La cantidad minima de caracteres son 6 para la contraseña"),
controladorInicio.EjemploPost);


rutas.put('/',
query('id')
.notEmpty().withMessage("No se aceptan valores vacios para el id del usuario")
.isInt().withMessage("El id del usuario debe ser un entero"),
body('usuario')
.notEmpty().withMessage("No se aceptan valores vacios para el Usuario")
.isLength({min:3}).withMessage("La cantidad minima de caracteres es 3 para el nombre de usuario"),
body('contrasena').notEmpty().withMessage("No se aceptan valores vacios para la contrasena")
.isLength({min:6}).withMessage("La cantidad minima de caracteres son 6 para la contraseña") ,controladorInicio.EjemploPut);


rutas.delete('/',
query('id')
.notEmpty().withMessage("No se aceptan valores vacios para el id del usuario")
.isInt().withMessage("El id del usuario debe ser un entero"),
controladorInicio.EjemploDelete);

module.exports = rutas;

