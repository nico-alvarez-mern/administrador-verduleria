const {Router} = require('express');
const ruta = Router();

ruta.use('/compras', require('./compras') );
ruta.use('/perdidas', require('./perdidas') );
ruta.use('/venta', require('./ventas') );

module.exports = ruta;