const {response} = require('express');
const moment = require('moment');
const { guardarVentaDbValidador } = require('./joiValidador');
const db = require('../db/ventasCrud');

const guardarVentaDb = async(req,res = response)=>{
    try {
        const resultadoValidador = guardarVentaDbValidador.validate(req.body);
        if(resultadoValidador.error){
            return errorParametrosResponse(res,req,resultadoValidador);
        }
        const ventaGuardada = await db.guardarVenta( moment().format(process.env.DATE_FORMAT),req.body );
        return res.json({
            ok : true,
            data : ventaGuardada
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok : false,
            mensaje : 'Internar server error'
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
    guardarVentaDb
}