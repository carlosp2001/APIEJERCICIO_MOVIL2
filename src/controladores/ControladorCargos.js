const {validationResult} = require('express-validator');
const modeloCargo = require('../modelos/modeloCargo');

exports.Listar = async (req, res) => {
    try {
        const lista = await modeloCargo.findAll();
        console.log(lista);
        res.json(lista);
    } catch (error) {
        console.error(error);
        res.json(error);
    }
};

exports.Guardar = async (req, res) => {
    // console.log(req.body);
    const validaciones = validationResult(req);
    console.log(validaciones.errors);
    const msj = {
        mensaje: ' '
    };  
    if (validaciones.errors.length > 0) {
        validaciones.errors.array.forEach(element => {
             msj.mensaje += element.msg + '. ';
        });
    }
    else {
        const { nombreCargo, descripcionCargo } = req.body;
        try {
            await modeloCargo.create(
                {
                     nombre: nombreCargo,
                     descripcion: descripcionCargo
                 }
            );
            msj.mensaje = 'Registro almacenado'
        } catch (error) {
            msj.mensaje = 'Error al guardar los datos';
            
        }
       
            
        
    }

    res.json(msj);
    
   
};

exports.Editar = async (req, res) =>{
    const validaciones = validationResult(req);
    console.log(validaciones.errors);
    const msj = {
        mensaje: ' '
    };
    if (validaciones.errors.length > 0) {
        // validaciones.errors.aÍÍrray.forEach(element => {
        //     msj.mensaje += element.msg + '. ';
        // });
    }
    else {
        const idCargo = req.query.id;
        const { nombreCargo, descripcionCargo } = req.body;
        try {
            var buscarCargo = await modeloCargo.findOne({
                where: {
                    id: idCargo
                }
            });
            if (!buscarCargo) {
                msj.mensaje = 'El id de registro no existe';
            } else {
                buscarCargo.nombre = nombreCargo;
                buscarCargo.descripcion = descripcionCargo;
                await buscarCargo.save();
                msj.mensaje = 'Registro Almacenado';
            }
        } catch (error) {
            msj.mensaje = 'Error al guardar los datos';
            
        }
    }
    res.json(msj);
}


exports.Eliminar = async (req, res) =>{
    const idCargo = req.query.id;
    const validaciones = validationResult(req);
    console.log(validaciones.errors);
    const msj  = {
        mensaje: "Ninguno"
    };
    if (!idCargo){
        msj.mensaje = 'Debe enviar los datos completos';
    }
    else {
        var eliminarcargo = await modeloCargo.destroy({
            where: {
                id: idCargo
            }
        });
        if (eliminarcargo) {
            msj.mensaje = 'Peticion Procesada correctamente';    
        } else {
            msj.mensaje = 'No se pudo realizar la operacion'; 
        }
    }    
    res.json(msj);
    }
