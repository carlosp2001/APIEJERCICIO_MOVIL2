const {Router} = require('express');
const {body, query} = require('express-validator');

const controladorUsuarios = require('../controladores/ControladorUsuarios');
const rutas = Router();
rutas.get('/listar', controladorUsuarios.Listar);

rutas.post('/guardar', body('loginUsuario').notEmpty().withMessage("No se aceptan valores vacios para el nombre"), body('empleadoUsuario').notEmpty().isInt(),body('contrasenaUsuario').notEmpty(),body('accesototalUsuario').notEmpty().isInt(),body('habilitadoUsuario').notEmpty().isInt(),body('pinUsuario').notEmpty(),body('correoUsuario').notEmpty(),body('estadoUsuario').notEmpty(), controladorUsuarios.Guardar);

rutas.put('/editar',
query('id')
.notEmpty().withMessage("No se aceptan valores vacios para el id del usuario")
.isInt().withMessage("El id del usuario debe ser un entero"),
body('loginUsuario')
        .notEmpty().withMessage("No se aceptan valores vacios para el login"),
    body('empleadoUsuario')
        .notEmpty().isInt(),
    body('contrasenaUsuario').notEmpty(),
    body('accesototalUsuario').notEmpty().isInt(),
    body('habilitadoUsuario').notEmpty().isInt(),
    body('pinUsuario').notEmpty(),
    body('correoUsuario').notEmpty(),
    body('estadoUsuario').notEmpty()
    , controladorUsuarios.Editar);

rutas.delete('/eliminar',
query('id')
.notEmpty().withMessage("No se aceptan valores vacios para el id de cargos")
.isInt().withMessage("El id del cargo debe ser un entero"),
controladorUsuarios.Eliminar);


module.exports = rutas;