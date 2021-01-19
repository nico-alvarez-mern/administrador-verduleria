const {Router} = require('express');
const { guardarPerdidaDb } = require('../../perdidas/infraestructura/controller');
const ruta = Router();

ruta.post('/', guardarPerdidaDb );

module.exports = ruta;