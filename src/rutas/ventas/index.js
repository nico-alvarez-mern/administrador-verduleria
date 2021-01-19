const {Router} = require('express');
const { guardarVentaDb } = require('../../ventas/infraestructura/controller');
const ruta = Router();

ruta.post('/', guardarVentaDb );

module.exports = ruta;