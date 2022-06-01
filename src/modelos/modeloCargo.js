const { DataTypes } = require("sequelize");
const db = require('../configuraciones/db');
    
const Cargo = db.define(
    'Cargo',{
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        nombre:{
            type: DataTypes.STRING(50),
            allowNull: false
        },
        descripcion:{
            type: DataTypes.TEXT,
            allowNull: true
        }
    },
        {
            tableName: 'cargos',
            timestamps: false
        }
        
);

module.exports = Cargo;