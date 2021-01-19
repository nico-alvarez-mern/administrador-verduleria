const request = require('supertest');
const test = require('ava');
const sinon = require('sinon').createSandbox();
const app = require('../../../index');
const db = require('../../infraestructura/db/CompraCrud');

test.afterEach( ()=> sinon.restore() );

test.cb('Enviamos un body correcto y recibimos un status 200', t => {
    const body = {
        nombre_producto:"naranjaa",
        cantidad : "20",
        precio_total : "700"
    }
    const resultadoEsperado = {
        ok:true,
        data : body
    }
    const dbStub = sinon.stub(db,'guardarCompra').returns(body);
    request(app)
        .post('/api/v1/compras')
        .send(body)
        .expect(200)
        .end( (error,response)=>{
            t.falsy(error, "No debe contener error");
            sinon.assert.called(dbStub);
            t.deepEqual(resultadoEsperado, response.body);
            t.end();
        });
});

test.cb('Enviamos un body sin un parametro requerido y recibimos un 422', t => {
    const body = {
        nombre_producto:"naranja",
        cantidad : "20",
    }
    request(app)
        .post('/api/v1/compras')
        .send(body)
        .expect(422)
        .end( (error)=>{
            t.falsy(error, "No debe contener error");
            t.end();
        });
});

test.cb('Enviamos un body con un parametro demas y recibimos un 422', t => {
    const body = {
        nombre_producto:"naranja",
        cantidad : "20",
        precio_total : "700",
        nombre_secundario : "sandia" //parametro extra
    }
    request(app)
        .post('/api/v1/compras')
        .send(body)
        .expect(422)
        .end( (error)=>{
            t.falsy(error, "No debe contener error");
            t.end();
        });
});

test.cb('Enviamos un body con una unidad de medida incorrecta y recibimos un 422', t => {
    const body = {
        nombre_producto:"naranja",
        cantidad : "20",
        precio_total : "700",
        unidad_medida : "litros" //unidad de medida incorrecta
    }
    request(app)
        .post('/api/v1/compras')
        .send(body)
        .expect(422)
        .end( (error)=>{
            t.falsy(error, "No debe contener error");
            t.end();
        });
});

test.cb('lanzamos una exepcion en base de datos y recibimos un 500', t => {
    const body = {
        nombre_producto:"naranja",
        cantidad : "20",
        precio_total : "700",
        unidad_medida : "kg"
    }
    const dbStub = sinon.stub(db,'guardarCompra').throwsException('error base de datos');
    sinon.stub(console,'log');
    request(app)
        .post('/api/v1/compras')
        .send(body)
        .expect(500)
        .end( (error)=>{
            t.falsy(error, "No debe contener error");
            sinon.assert.called(dbStub);
            t.end();
        });
});

test.cb(
'lanzamos una exepcion en base de datos porque el nombre del producto ya existe y recibimos un 404'
, t => {
    const body = {
        nombre_producto:"naranja",
        cantidad : "20",
        precio_total : "700",
        unidad_medida : "kg" 
    }
    const dbStub = sinon.stub(db,'guardarCompra').throwsException({code: 11000});
    sinon.stub(console,'log');
    request(app)
        .post('/api/v1/compras')
        .send(body)
        .expect(404)
        .end( (error)=>{
            t.falsy(error, "No debe contener error");
            sinon.assert.called(dbStub);
            t.end();
        });
});