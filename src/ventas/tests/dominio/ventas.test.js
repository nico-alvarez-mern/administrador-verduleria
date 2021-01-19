const test = require('ava');
const { devolverVentaMismoDia,sumarVentas } = require('../../dominio/ventas');

const mockVentas = [
    {
        fecha : '2021-01-17',
        total : 2000
    },
    {
        fecha : '2021-01-16',
        total : 2000
    }
]

test('Envio una venta el 17-01 donde ya tengo venta cargada,debe devolver esa vebta', t=>{
    const fecha = '2021-01-17';

    const resultado = devolverVentaMismoDia(fecha,mockVentas);

    t.deepEqual(resultado,mockVentas[0])
});

test('envio dos ventas y debo obtener una venta con los valores sumados', t =>{
    const ventaUno = {
        total : 2000
    }
    const ventaDos = {
        total : 2000
    }
    const respuestaEsperada = {
        total : ventaUno.total + ventaDos.total
    }

    const resultado = sumarVentas(ventaUno,ventaDos);

    t.deepEqual(resultado,respuestaEsperada);
});

