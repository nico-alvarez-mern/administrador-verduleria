const Ganancia = require('./gananciaModel');
const moment = require('moment');
const { calcularGanancias } = require('../../dominio/ganancias');
const {guardarPerdidaCMV} = require('../../../perdidas/infraestructura/db/perdidasCrud')

const guardarGanancia = async(venta,valorPromedio,fecha = null)=>{
    try {
        if(!fecha){
            fecha = moment().format(process.env.DATE_FORMAT);
        }
        let { total, cmv } = calcularGanancias(venta,valorPromedio);
        const gananciaMismaFecha = await findGanancia(fecha);
        if(gananciaMismaFecha){
            console.log(gananciaMismaFecha)
            total = total + gananciaMismaFecha.total;
        }
        await guardarPerdidaCMV(cmv);
        return await saveGanancia({total});
    } catch (error) {
        throw error;
    }
}


const saveGanancia = async(ganancia)=>{
    const nuevaGanancia = new Ganancia(ganancia);
    return await nuevaGanancia.save();
}

const findGanancia = async(fecha)=>{
    return await Ganancia.find({fecha : fecha})[0];
}

module.exports = {
    guardarGanancia
}