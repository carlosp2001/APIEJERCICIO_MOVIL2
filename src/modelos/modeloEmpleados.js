const { DataTypes } = require("sequelize");
const db = require('../configuraciones/db');
const Cargo = require('./modeloCargo');
    
const Empleado = db.define(
    'Empleado',{
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        identidad:{
            type: DataTypes.STRING(15),
            allowNull: false
        },
        nombre:{
            type: DataTypes.STRING(50),
            allowNull: false
        },
        apellido:{
            type: DataTypes.STRING(50),
            allowNull: false
        },
        cargos_id:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        fechaingreso:{
            type: DataTypes.DATE,
            allowNull: false
        },        
        salario:{
            type: DataTypes.DOUBLE,
            allowNull: true
        },
        imagen:{
            type: DataTypes.STRING(250),
            allowNull: true
        },
    },
        {
            tableName: 'empleados',
            timestamps: false
        }
        
);
// Cargo.hasMany(Empleado);
Cargo.hasMany(Empleado, {
    foreignKey: 'cargos_id',
    otherKey: 'id'
});
Empleado.belongsTo(Cargo, {
    foreignKey: 'cargos_id',
    otherKey: 'id'
});
module.exports = Empleado;