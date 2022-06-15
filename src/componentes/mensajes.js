const msj = (res, estado, mensajes) => {
    res.setHeader("Content-Type", "application/json");
    res.statusCode = estado;
    res.json(mensajes);
};

module.exports = msj;
