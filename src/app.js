const express = require('express');
const morgan = require('morgan');
const app = express();
app.set('port', 3001);
app.use(morgan('combined'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.get('/', (req, res)=>{
    res.send("Hola Mundo");
});
app.listen(app.get('port'),()=>{
    console.log("Servidor iniciado en el puerto "+app.get('port'));
});
