const test = require('ava');
const moment = require('moment');
const {registrarCompra,calcularPrecioUnidad} = require('../../dominio/compra');

const compra = {
    fecha : moment().format("DD-MM-YYYY"),
    nombre : 'naranja',
    unidad_medida : 'kg',
    cantidad : 20,
    precio_total : 700
}

test('Registramos una compra correctamente', t =>{
    const resultadoEsperado = {...compra, precio_unidad : calcularPrecioUnidad(compra) };
    const resultado = registrarCompra(compra);

    t.deepEqual(resultado,resultadoEsperado);
});

test('Sacar precio unidad', t=>{
    const resultado = calcularPrecioUnidad(compra);

    t.is( resultado, compra.precio_total / compra.cantidad );
});