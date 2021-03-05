const {Router} = require('express');
const { guardarPerdidaDb,guardarCMV } = require('../../perdidas/infraestructura/controller');
const ruta = Router();

ruta.post('/', guardarPerdidaDb );
ruta.post('/cmv', guardarCMV );

module.exports = ruta;