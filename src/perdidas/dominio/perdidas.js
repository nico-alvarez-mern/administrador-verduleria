const moment = require('moment');

const calcularPerdida = (kg,valorPromedio)=>{
    return Math.round(kg * valorPromedio);
}

//CMV : costo de mercaderia vendida
const calcularCMV = (ventasKG,valorPromedio)=>{
    return Math.round(ventasKG * valorPromedio);
}

const crearPerdida = (kg,valor) => {
    return  {
        kg,
        valor : calcularPerdida(kg,valor) 
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
    calcularCMV,
    devolverPerdidaDelMismoDia,
    crearPerdida,
    sumarPerdidas
}