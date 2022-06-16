const nodemailer = require('nodemailer');
exports.RecuperarContrasena = async (data) => {
    const configurarCorreo = {
        from: "cara_p@unicah.edu",
        to: data.correo,
        subject: 'Recuperar contraseña SIGRES',
        text: 'Pin temporal: ' + data.pin,
    };
    const transporte = nodemailer.createTransport({
        host: process.env.CORREO_HOST,
        port: process.env.CORREO_PORT,
        service: 'gmail',
        secure: true,
        auth: {
            user: process.env.APP_CORREO,
            pass: process.env.CORREO_CONTRASENA
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