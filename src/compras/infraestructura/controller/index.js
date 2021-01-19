const {response} = require('express');
const { guardarCompraDbValidador } = require('./joiValidator');
const db = require('../db/CompraCrud');

const registrarCompraEnDb = async(req,res = response) =>{
    try {
        const resultadoValidador = guardarCompraDbValidador.validate(req.body);
        if(resultadoValidador.error){
            return errorParametrosResponse(res,req,resultadoValidador);
        }
        const compra = await db.guardarCompra(req.body);
        return res.json({
            ok:true,
            data : compra
        });
    }catch(error){
        if(error.code === 11000){
            return res.status(404).json({
                ok :false,
                mensaje: 'El nombre del producto ya existe'
            });
        }
        console.log(error);
        return res.status(500).json({
            ok :false,
            mensaje: 'Internal server error',
            error
        });
    }
}

const obtenerCompras = async(req,res = response) => {
    try {
        const compras = await db.obtenerTodasLasCompras();
        return res.json({
            ok : true,
            data : compras
        });
    } catch (error) {
        return res.status(500).json({
            ok : false,
            mensaje : 'Internal server error'
        });
    }
}

const eliminarCompra = async(req,res = response) => {
    try {
        const compra = await db.borrarCompra(req.params.id);
        if(!compra){
            return res.status(404).json({
                ok : false,
                mensaje : 'no existe esa compra'
            });
        }
        return res.json({
            ok : true,
            data : compra
        });
    } catch (error) {
        return res.status(500).json({
            ok : false,
            mensaje : 'Internal server error'
        });
    }
}

const actualizarCompra = async(req,res = response) => {
    try {
        const compra = await db.actualizarCompra(req.params.id);
        if(!compra){
            return res.status(404).json({
                ok : false,
                mensaje : 'no existe esa compra'
            });
        }
        return res.json({
            ok : true,
            data : compra
        });
    } catch (error) {
        return res.status(500).json({
            ok : false,
            mensaje : 'Internal server error'
        });
    }
}

const errorParametrosResponse = (response,request,resultado) =>{
    return response.status(422).json({
        status: "error",
        message: "Invalid request data",
        detail: resultado.error.details[0].message,
        data: request.body,
    });
}

module.exports = {
    registrarCompraEnDb,
    obtenerCompras,
    eliminarCompra,
    actualizarCompra
}