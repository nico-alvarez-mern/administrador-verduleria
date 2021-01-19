const moment = require('moment');

const devolverVentaMismoDia = (fecha,ventas) => {
    const fechaUpdate = moment(fecha,process.env.DATE_FORMAT);
    const ventaEncontrada = ventas.find( v => {
        return fechaUpdate.diff(moment(v.fecha,process.env.DATE_FORMAT),'d') === 0; 
    });
    return ventaEncontrada ? ventaEncontrada : null;
}

const sumarVentas = (nuevaVenta,ventaActual)=>{
    return {
        total : nuevaVenta.total + ventaActual.total
    }
}

module.exports = {
    devolverVentaMismoDia,
    sumarVentas
}