const {Router} = require('express');
const {body, query} = require('express-validator');

const controladorEmpleados = require('../controladores/ControladorEmpleados');
const rutas = Router();
rutas.get('/listar', controladorEmpleados.Listar);

rutas.post('/guardar',
    body('identidadEmpleado').notEmpty().withMessage("No se aceptan valores vacios para el la identidad").isLength({ min: 13 }).withMessage("La cantidad minima de caracteres es 13 para la identidad"),
    body('nombreEmpleado').notEmpty(),
    body('apellidoEmpleado').notEmpty(),
    body('cargos_idEmpleado').notEmpty().isInt(),
    body('fechaingresoEmpleado').notEmpty().isDate(),
    body('salarioEmpleado').notEmpty(),
    body('imagenEmpleado'),
    controladorEmpleados.Guardar);

rutas.put('/editar',
query('id')
.notEmpty().withMessage("No se aceptan valores vacios para el id del empleado")
.isInt().withMessage("El id del empleado debe ser un entero"),
body('identidadEmpleado')
        .notEmpty().withMessage("No se aceptan valores vacios para el nombre")
        .isLength({ min: 13 }).withMessage("La cantidad minima de caracteres es 13 para la identidad"),
    body('nombreEmpleado')
        .notEmpty(),
    body('apellidoEmpleado').notEmpty(),
    body('cargos_idEmpleado').notEmpty().isInt(),
    body('fechaingresoEmpleado').notEmpty(),
    body('salarioEmpleado').notEmpty().isFloat(),
    body('imagenEmpleado').notEmpty()
    , controladorEmpleados.Editar);

rutas.delete('/eliminar',
query('id')
.notEmpty().withMessage("No se aceptan valores vacios para el id de cargos")
.isInt().withMessage("El id del cargo debe ser un entero"),
controladorEmpleados.Eliminar);


module.exports = rutas;