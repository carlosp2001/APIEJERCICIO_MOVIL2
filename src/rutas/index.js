const { Router } = require('express');
const rutas = Router();
const controladorInicio = require('../controladores/ControladorInicio');
rutas.get('/', controladorInicio.Inicio);
rutas.get('/otra',controladorInicio.Otra );
module.exports = rutas;
