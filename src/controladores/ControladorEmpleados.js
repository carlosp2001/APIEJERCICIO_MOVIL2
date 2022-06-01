const {validationResult} = require('express-validator');
const modeloEmpleado = require('../modelos/modeloEmpleados');

exports.Listar = async (req, res) => {
    try {
        const lista = await modeloEmpleado.findAll();
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
            msj.mensaje += element.msg;
        });
    }
    else {
        const { identidadEmpleado, nombreEmpleado, apellidoEmpleado, cargos_idEmpleado, fechaingresoEmpleado, salarioEmpleado, imagenEmpleado } = req.body;
        try {
            await modeloEmpleado.create(
                {
                    identidad: identidadEmpleado,
                    nombre: nombreEmpleado,
                    apellido: apellidoEmpleado,
                    cargos_id: cargos_idEmpleado,
                    fechaingreso: fechaingresoEmpleado,
                    salario: salarioEmpleado,
                    imagen: imagenEmpleado
                 }
            );
            msj.mensaje = 'Registro almacenado'
        } catch (error) {
            msj.mensaje = 'Error al guardar los datos';
            
        }
        
            
        
    }
    res.json(msj);
    console.log(msj);
    
   
};

exports.Editar = async (req, res) =>{
    const validaciones = validationResult(req);
    console.log(validaciones.errors);
    const msj = {
        mensaje: ' '
    };
    if (validaciones.errors.length > 0) {
        // validaciones.errors.array.forEach(element => {
        //     msj.mensaje += element.msg + '. ';
        // });
    }
    else {
        const idEmpleado = req.query.id;
        const { identidadEmpleado, nombreEmpleado, apellidoEmpleado, cargos_idEmpleado, fechaingresoEmpleado, salarioEmpleado, imagenEmpleado} = req.body;
        try {
            var buscarEmpleado = await modeloEmpleado.findOne({
                where: {
                    id: idEmpleado
                }
            });
            if (!buscarEmpleado) {
                msj.mensaje = 'El id de registro no existe';
            } else {
                buscarEmpleado.identidad = identidadEmpleado;
                buscarEmpleado.nombre = nombreEmpleado;
                buscarEmpleado.apellido = apellidoEmpleado;
                buscarEmpleado.cargos_id = cargos_idEmpleado;
                buscarEmpleado.fechaingreso = fechaingresoEmpleado;
                buscarEmpleado.salario = salarioEmpleado;
                buscarEmpleado.imagen = imagenEmpleado;
                await buscarEmpleado.save();
                msj.mensaje = 'Registro Almacenado';
            }
        } catch (error) {
            msj.mensaje = 'Error al guardar los datos';
            
        }
    }
    res.json(msj);
}


exports.Eliminar = async (req, res) =>{
    const idEmpleado = req.query.id;
    const validaciones = validationResult(req);
    console.log(validaciones.errors);
    const msj  = {
        mensaje: "Ninguno"
    };
    if (!idEmpleado){
        msj.mensaje = 'Debe enviar los datos completos';
    }
    else {
        var eliminarEmpleado = await modeloEmpleado.destroy({
            where: {
                id: idEmpleado
            }
        });
        if (eliminarEmpleado) {
            msj.mensaje = 'Peticion Procesada correctamente';    
        } else {
            msj.mensaje = 'No se pudo realizar la operacion'; 
        }
    }  
    res.json(msj);
    }  
    
    
