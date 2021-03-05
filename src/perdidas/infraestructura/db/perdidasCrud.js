const db = require('../../../valor-promedio/infraestructura/db/valorPromedio');
const moment = require('moment');
const { crearPerdida, devolverPerdidaDelMismoDia,sumarPerdidas,sumarCMV } = require('../../dominio/perdidas');
const Perdidas = require('./perdidasModel');


const guardarPerdidas = async(kg,fecha = null)=>{
    try {
        if(!fecha){
            fecha = moment().format(process.env.DATE_FORMAT);
        }
        const { valor } = await db.obtenerValorPromedio();
        const perdida = crearPerdida(kg,valor);
        const perdidas = await obtenerPerdidas();
        const yaExistePerdidaHoy = devolverPerdidaDelMismoDia(fecha,perdidas);
        if(yaExistePerdidaHoy){
            const nuevaPerdida = sumarPerdidas(perdida,yaExistePerdidaHoy,valor);
            return await updatePerdida(yaExistePerdidaHoy._id,nuevaPerdida);
        }
        return await savePerdida(perdida);
    } catch (error) {
        throw error;
    }
}

const guardarPerdidaCMV = async(totalCMV,fecha = null)=>{
    try {
        if(!fecha){
            fecha = moment().format(process.env.DATE_FORMAT);
        }
        const perdidas = await obtenerPerdidas();
        const yaExistePerdidaHoy = devolverPerdidaDelMismoDia(fecha,perdidas);
        if(yaExistePerdidaHoy){
            const perdida = sumarCMV(totalCMV,yaExistePerdidaHoy);
            return await updatePerdida(yaExistePerdidaHoy._id,perdida);
        }
        const perdida = crearPerdida( 0,0,totalCMV);
        return await savePerdida(perdida);
    } catch (error) {
        throw error;
    }
}
const savePerdida = async(perdida)=>{
    const nuevaPerdida = new Perdidas(perdida);
    return await nuevaPerdida.save();
}

const updatePerdida = async(id,perdida)=>{
    return await Perdidas.findByIdAndUpdate(id,perdida,{new : true});
}

const obtenerPerdidas = async() =>{
    try {
        const perdidas = await Perdidas.find();
        return perdidas;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    guardarPerdidas,
    obtenerPerdidas,
    updatePerdida,
    guardarPerdidaCMV
}