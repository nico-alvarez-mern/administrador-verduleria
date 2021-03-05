const test = require('ava');
const moment = require('moment');
const { mock } = require('sinon');
const { calcularPerdida,
        devolverPerdidaDelMismoDia,
        sumarPerdidas,
        crearPerdida } = require('../../dominio/perdidas');


test('Debo calcular la perdida en base a los KG exitosamente', t =>{
    const kg = 10;
    const valorPromedio = 70;
    const resultadoEsperado = kg * valorPromedio;

    const resultado = calcularPerdida(kg,valorPromedio);

    t.is(resultado,resultadoEsperado);
});

/* test('Debo calcular el CMV exitosamente', t =>{
    const ventasKG = 100;
    const valorPromedio = 70;
    const resultadoEsperado = ventasKG * valorPromedio;

    const resultado = calcularCMV(ventasKG,valorPromedio);

    t.is(resultado,resultadoEsperado);
}); */

test('Fechas del mismo dia', t =>{
    const fecha = moment('2021-01-15');
    const resultadoEsperado = {
        fecha : '2021-01-15',
        valor : 20
    }
    const mockListaPerdidas = [
        {
            fecha : '2021-01-15',
            valor : 20
        },
        {
            fecha : '2021-01-14',
            valor : 20
        },
    ]
    
    const resultado = devolverPerdidaDelMismoDia(fecha,mockListaPerdidas);

    t.deepEqual(resultado,resultadoEsperado);
});

test('No hay fecha del mismo dia', t =>{
    const fecha = moment('2021-01-16');
    const mockListaPerdidas = [
        {
            fecha : '2021-01-15',
            valor : 20
        },
        {
            fecha : '2021-01-14',
            valor : 20
        },
    ]
    
    const resultado = devolverPerdidaDelMismoDia(fecha,mockListaPerdidas);

    t.deepEqual(resultado,null);
});

test('Debe crear una perdida correctamente', t =>{
    const resultadoEsperado = {
        kg: 20,
        valor : calcularPerdida(20,70)
    }
    const kg = 20;
    const valorPromedio = 70;
    const resultado = crearPerdida(kg,valorPromedio);

    t.deepEqual(resultado,resultadoEsperado);
});

test('Debe devolver las dos perdidas sumadas', t =>{
    const kg = 20;
    const valorPromedio = 20;
    const perdidaUno = crearPerdida(kg,valorPromedio);
    const perdidaDos = crearPerdida(kg,valorPromedio);
    const resultadoEsperado = crearPerdida(40,valorPromedio);

    const resultado = sumarPerdidas(perdidaUno,perdidaDos,20);
    
    t.deepEqual(resultado,resultadoEsperado);
});