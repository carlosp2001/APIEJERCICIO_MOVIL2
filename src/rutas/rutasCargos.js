const {Router} = require('express');
const {body, query} = require('express-validator');

const controladorCargos = require('../controladores/ControladorCargos');
const rutas = Router();
rutas.get('/listar', controladorCargos.Listar);

rutas.post('/guardar',
body('nombreCargo')
.notEmpty().withMessage("No se aceptan valores vacios para el nombre")
.isLength({min:3}).withMessage("La cantidad minima de caracteres es 3 para el nombre de cargo"), controladorCargos.Guardar);

rutas.put('/editar',
query('id')
.notEmpty().withMessage("No se aceptan valores vacios para el id del usuario")
.isInt().withMessage("El id del cargo debe ser un entero"),
body('nombreCargo')
    .notEmpty().withMessage("No se aceptan valores vacios para el nombre")
    .isLength({ min: 3 }).withMessage("La cantidad minima de caracteres es 3 para el nombre de cargo")
    , controladorCargos.Editar);

rutas.delete('/eliminar',
query('id')
.notEmpty().withMessage("No se aceptan valores vacios para el id de cargos")
.isInt().withMessage("El id del cargo debe ser un entero"),
controladorCargos.Eliminar);


module.exports = rutas;
