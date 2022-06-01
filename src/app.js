const express = require('express');
const morgan = require('morgan');
const app = express();
app.set('port', 3002);
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use('/api/', require('./rutas'));
app.use('/api/cargos', require('./rutas/rutasCargos'));
app.use('/api/empleados', require('./rutas/rutasEmpleados'));
app.use('/api/usuarios', require('./rutas/rutasUsuarios'));


// app.get('/', (req, res)=>{
//     res.send("Hola Mundo");
// });
app.listen(app.get('port'),()=>{
    console.log("Servidor iniciado en el puerto "+app.get('port'));
});
