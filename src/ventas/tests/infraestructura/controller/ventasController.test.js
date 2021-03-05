const request = require('supertest');
const test = require('ava');
const sinon = require('sinon').createSandbox();
const db = require('../../../infraestructura/db/ventasCrud');
const app = require('../../../../index');

test.afterEach( ()=> sinon.restore() );

test.cb('Envio un body valido y recibimos un status 200', t=>{
    const ventaTest = {
        fecha : '2021-01-17',
        total : 4500,
        total_kg : 50,
        total_unidad : 2000,
        costo_unidad : 800
    }
    const body = { 
        total : 4500,
        total_kg : 50,
        total_unidad : 2000,
        costo_unidad : 800
    };
    const dbStub = sinon.stub(db,'guardarVenta').returns(ventaTest);

    request(app)
        .post('/api/v1/venta')
        .send(body)
        .expect(200)
        .end( (error,response)=>{
            t.falsy(error,'No debe contener error');
            sinon.assert.called(dbStub);
            t.deepEqual(response.body,{ok : true, data : ventaTest});
            t.end();
        });
});

test.cb('Envio un body incorrecto y recibimos un status 422', t=>{
    const body = { fecha : '2021-01-17' };
    request(app)
        .post('/api/v1/venta')
        .send(body)
        .expect(422)
        .end( (error)=>{
            t.falsy(error,'No debe contener error');
            t.end();
        });
});