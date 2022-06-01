const { DataTypes } = require("sequelize");
const db = require('../configuraciones/db');
const bcrypt = require('bcrypt');
    
const Usuario = db.define(
    'Usuario',{
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        login:{
            type: DataTypes.STRING(30),
            allowNull: false,
            unique: {
                msg: 'El login debe ser unico'
            }
        },
        empleado:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        contrasena:{
            type: DataTypes.STRING(250),
            allowNull: false
        },
        accesototal:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        habilitado:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },        
        pin:{
            type: DataTypes.STRING(4),
            allowNull: true,
            defaultValue: '0000'
        },
        fallidos:{
            type: DataTypes.INTEGER,
            allowNull: true
        },
        correo:{
            type: DataTypes.STRING(250),
            allowNull: false,
            defaultValue: null,
            unique: {
                msg: 'El correo debe ser unico'
            }
        },
        estado:{
            type: DataTypes.ENUM('BL','AC', 'IN'),
            allowNull: true,
            defaultValue: 'AC'
        }
    },
        {
            tableName: 'usuarios',
            timestamps: false,
            hooks: {
                beforeCreate(usuario) {
                    const hash = bcrypt.hashSync(usuario.contrasena, 10);
                    usuario.contrasena = hash;
                },
                beforeUpdate(usuario) {
                    const hash = bcrypt.hashSync(usuario.contrasena, 10);
                    usuario.contrasena = hash;
                }
            }
        }
        
);
Usuario.prototype.verificarContrasena = (con, com) => {
    return bcrypt.compareSync(con, com);
};

module.exports = Usuario;