const moment = require('moment');

const calcularPerdida = (kg,valorPromedio)=>{
    return Math.round(kg * valorPromedio);
}

const crearPerdida = (kg,valor,totalCMV = null) => {
    if(totalCMV){
        return {
            kg : 0,
            valor : totalCMV
        }
    }
    return  {
        kg,
        valor : calcularPerdida(kg,valor) 
    }
}

const sumarCMV = (totalCMV,perdida) => {
    const { kg, valor } = perdida;
    return {
        kg,
        valor : valor + totalCMV
    }
}

const devolverPerdidaDelMismoDia = (fecha,listaPerdidas = []) =>{
    const fechaUpdate = moment(fecha,process.env.DATE_FORMAT);
    const perdidaEncontrada = listaPerdidas.find( p => {
        return fechaUpdate.diff(moment(p.fecha,process.env.DATE_FORMAT),'d') === 0; 
    });
    return perdidaEncontrada ? perdidaEncontrada : null;
}

const sumarPerdidas = (perdidaEntrante,perdidaExistente,valorPromedio) => {
    const kg = perdidaEntrante.kg + perdidaExistente.kg;
    return crearPerdida(kg,valorPromedio);
}

module.exports = {
    calcularPerdida,
    devolverPerdidaDelMismoDia,
    crearPerdida,
    sumarPerdidas,
    sumarCMV
}