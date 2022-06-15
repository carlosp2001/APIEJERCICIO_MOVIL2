const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
app.set('port', 3002);
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use('/api/', require('./rutas'));
app.use('/api/img/', express.static(path.join(__dirname, 'public/img')))
app.use('/api/cargos', require('./rutas/rutasCargos'));
app.use('/api/empleados', require('./rutas/rutasEmpleados'));
app.use('/api/usuarios', require('./rutas/rutasUsuarios'));
app.use('/api/autenticacion', require('./rutas/rutasAutenticacion'));
app.use('/api/archivos/', require('./rutas/rutasArchivos'));


// app.get('/', (req, res)=>{
//     res.send("Hola Mundo");
// });
app.listen(app.get('port'),()=>{
    console.log("Servidor iniciado en el puerto "+app.get('port'));
});
