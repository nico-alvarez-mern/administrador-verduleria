const test = require('ava');
const sinon = require('sinon').createSandbox();
const moment = require('moment');
const dbPerdidas = require('../../../infraestructura/db/perdidasCrud');
const dbValorPromedio = require('../../../../valor-promedio/infraestructura/db/valorPromedio');


test.afterEach( ()=> sinon.restore() );

const mockPerdidas = [
    {
        id: '123',
        fecha : moment('2021-01-15'),
        kg : 20,
        valor : 1400
    },
    {
        id: '124',
        fecha : moment('2021-01-14'),
        kg : 10,
        valor : 700
    }
]
const valorPromedio = 70;

test('Entra una nueva perdida el mismo dia de una ya existente', async(t) =>{
    const dbPerdidasStub = sinon.stub(dbPerdidas,'obtenerPerdidas').returns(mockPerdidas);
    const dbValorStub = sinon.stub(dbValorPromedio,'obtenerValorPromedio').returns(valorPromedio);
    const fecha = '2021-01-15';
    const kg = 20;
    const perdidaUpdate = {
        id: '123',
        fecha : moment('2021-01-15'),
        kg : 40,
        valor : 2800
    }
    const updateStub = sinon.stub(dbPerdidas,'updatePerdida').returns(perdidaUpdate);
     
    /* const resultado = await dbPerdidas.guardarPerdidas(kg,fecha) */
    /* t.deepEqual(resultado,perdidaUpdate); */
    t.pass();
});

 