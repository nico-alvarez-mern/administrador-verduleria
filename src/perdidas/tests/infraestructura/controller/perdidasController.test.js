const request = require('supertest');
const test = require('ava');
const sinon = require('sinon').createSandbox();
const app = require('../../../../index');
const db = require('../../../infraestructura/db/perdidasCrud');

test.cb('Enviamos un body correcto y recibimos un status 200', t => {
    const body = {
        kg : 20
    }
    const dbReturn = {
        "fecha": "2021-01-16T22:35:54.425Z",
        "_id": "1",
        "kg": 20,
        "valor": 1400,
        "__v": 0
    }
    const respuestaEsperada = {
        ok : true,
        data : dbReturn
    }
    const dbStub = sinon.stub(db,'guardarPerdidas').returns(dbReturn);
    request(app)
        .post('/api/v1/perdidas')
        .send(body)
        .expect(200)
        .end( (error,response)=>{
            t.falsy(error, "No debe contener error");
            sinon.assert.called(dbStub);
            t.deepEqual(respuestaEsperada, response.body);
            t.end();
        });
});

test.cb('Enviamos un body correcto A /cmv y recibimos un status 200', t => {
    const body = {
        total : 1500
    }
    const dbReturn = {
        "fecha": "2021-01-16T22:35:54.425Z",
        "_id": "1",
        "kg": 0,
        "valor": 1500,
        "__v": 0
    }
    const respuestaEsperada = {
        ok : true,
        data : dbReturn
    }
    const dbStub = sinon.stub(db,'guardarPerdidaCMV').returns(dbReturn);
    request(app)
        .post('/api/v1/perdidas/cmv')
        .send(body)
        .expect(200)
        .end( (error,response)=>{
            t.falsy(error, "No debe contener error");
            sinon.assert.called(dbStub);
            t.deepEqual(respuestaEsperada, response.body);
            t.end();
        });
});