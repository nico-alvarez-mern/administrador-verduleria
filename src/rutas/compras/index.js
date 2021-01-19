const {Router} = require('express');
const { registrarCompraEnDb,
        obtenerCompras,
        eliminarCompra,
        actualizarCompra } = require('../../compras/infraestructura/controller');
const ruta = Router();

ruta.post('/', registrarCompraEnDb );
ruta.get('/', obtenerCompras );
ruta.delete('/:id', eliminarCompra );
ruta.put('/:id', actualizarCompra );

module.exports = ruta;