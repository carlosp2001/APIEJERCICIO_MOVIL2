const nodemailer = require('nodemailer');
exports.RecuperarContrasena = async (data) => {
    const configurarCorreo = {
        from: 'quien envia',
        to: 'destino al que se envia',
        subject: 'Recuperar contraseña SIGRES',
        text: 'Pin temporal: ' + data.pin,
    };
    const transporte = nodemailer.createTransport({
        host: 'servidor del correo',
        port: 'puerto del servidor',
        secure: true,
        auth: {
            user: 'nombre del usuario del correo',
            pass: 'contrasena del usuario',
        }
    });
    await transporte.verify(async function (error, success) {
        if (error) {
            console.log(error);
            return false;
        } else {
            console.log('El servidor puede enviar correos');

        }
    });
    return await transporte.sendMail(configurarCorreo);
};