const test = require('ava');
const { calcularCMV,calcularGanancias } = require('../../dominio/ganancias');


test('Calcular Ganancias', t=>{
    const total_kg = 50;
    const valorPromedio = 70;
    const total_unidad = 2000;
    const costo_unidad = 1000;
    const total = 4000;
    const cmv = calcularCMV(total_kg,valorPromedio,total_unidad,costo_unidad);
    const resultadoEsperado = {
        total : total - cmv
    };

    const resultado = calcularGanancias({total_kg,total_unidad,costo_unidad,total},valorPromedio);

    t.deepEqual(resultado,resultadoEsperado);

});

test('Calcular el CMV correctamente', t=>{
    const totalKg = 50;
    const valorPromedio = 70;
    const totalUnidad = 2000;
    const costoUnidad = 1000;
    const resultadoEsperado = (totalKg * valorPromedio) + (totalUnidad - costoUnidad);

    const resultado = calcularCMV(totalKg,valorPromedio,totalUnidad,costoUnidad);

    t.is(resultado,resultadoEsperado);
});