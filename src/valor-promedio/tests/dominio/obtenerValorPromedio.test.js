const test = require('ava');
const { calcularValorPromedio } = require('../../dominio/obtenerValorPromedio');

const mockCompras = [
    {
        "unidad_medida": "kg",
        "fecha": "2021-01-15T19:47:34.214Z",
        "nombre_producto": "naranja",
        "cantidad": 20,
        "precio_total": 700,
        "precio_unidad": 35,
        "id": "6001f156b34be74ad021f71b"
    },
    {
        "unidad_medida": "kg",
        "fecha": "2021-01-15T19:47:34.214Z",
        "nombre_producto": "banana",
        "cantidad": 20,
        "precio_total": 1400,
        "precio_unidad": 70,
        "id": "6001f156b34be74ad021f71a"
    }
]

test('Le paso un array de compras y me debe devolver un promedio correcto', t =>{
    const mockSuma = mockCompras[0].precio_unidad + mockCompras[1].precio_unidad;
    const resultadoEsperado = Math.round(mockSuma / mockCompras.length);

    const resultado = calcularValorPromedio(mockCompras);
    
    t.is(resultado, resultadoEsperado);
});

test('No hay compras actualmente', t =>{
    const resultado = calcularValorPromedio([]);

    t.is(resultado, 0);
});