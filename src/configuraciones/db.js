const sequelize = require('sequelize');
const db = new sequelize(
    'sigres', //base de datos
    'carlosp2001', //usuario
    'abc123def', //contraseña
    {
        host: 'localhost',
        dialect: 'mysql',
        port: 3306
    }
);

module.exports = db;    