const fs = require('fs');
const path = require('path');
const Empleado = require('../modelos/modeloEmpleados');
const MSJ = require('../componentes/mensajes');

exports.Recibir = async (req, res) => {
    const { filename } = req.file;
    const { id } = req.body;
    try {
        var buscarEmpleado = await Empleado.findOne({
            where : {
                id:id
            }
        });
    if (!buscarEmpleado) {
        const buscarImagen = fs.existsSync(path.join(__dirname, '../public/img/empleados/' + filename));
        if (buscarImagen) {
            fs.unlinkSync(path.join (__dirname, '../public/img/empleados/' + filename));
            console.log('Imagen Eliminada');
        }
        res.send('El id del empleado no existe');
    } else {
        const buscarImagen = fs.existsSync(path.join(__dirname, '../public/img/empleados/' + buscarEmpleado.imagen));
        if (buscarImagen) {
            fs.unlinkSync(path.join (__dirname, '../public/img/empleados/' + buscarEmpleado.imagen));
            console.log('Imagen Eliminada');
        }
        buscarEmpleado.imagen = filename;
        await buscarEmpleado.save()
            .then((data) => {
                res.json(data);
            })
            .catch((error) => {
                res.json(error);
            });
    }
        
    } catch (error) {
        res.json(error);
    }

};

