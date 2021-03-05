const { response } = require('express');
const moment = require('moment');
const db = require('../db/perdidasCrud');
const {guardarPerdidaDbValidador,guardarCMVValidador} = require('./joiValidador');

const guardarPerdidaDb = async(req,res = response) => {
    try {
        const resultadoValidador = guardarPerdidaDbValidador.validate(req.body);
        if(resultadoValidador.error){
            return errorParametrosResponse(res,req,resultadoValidador);
        }
        const perdida = await db.guardarPerdidas(req.body.kg);
        return res.json({
            ok : true,
            data : perdida
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok : false,
            mensaje : 'Internal server error'
        });
    }
}

const guardarCMV = async(req,res = response) => {
    try {
        const resultadoValidador = guardarCMVValidador.validate(req.body);
        if(resultadoValidador.error){
            return errorParametrosResponse(res,req,resultadoValidador);
        }
        const perdida = await db.guardarPerdidaCMV(req.body.total);
        return res.json({
            ok : true,
            data : perdida
        });
    } catch (error) {
        console.log(error);
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
    guardarPerdidaDb,
    guardarCMV
}