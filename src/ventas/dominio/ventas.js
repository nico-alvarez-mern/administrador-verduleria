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
        total : nuevaVenta.total + ventaActual.total,
        total_kg : nuevaVenta.total_kg + ventaActual.total_kg,
        total_unidad : nuevaVenta.total_unidad + ventaActual.total_unidad,
        costo_unidad : nuevaVenta.costo_unidad + ventaActual.costo_unidad,
    }
}

module.exports = {
    devolverVentaMismoDia,
    sumarVentas
}

