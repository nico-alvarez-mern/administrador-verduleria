const moment = require('moment');

const registrarCompra = (compra = {})=>{
    const compraRegistrar = {
        fecha : moment().format(process.env.DATE_FORMAT),
        ...compra,
        precio_unidad : calcularPrecioUnidad(compra) 
    };
    return compraRegistrar;
}
const calcularPrecioUnidad = ({cantidad, precio_total})=>{
    return precio_total / cantidad;
}

module.exports = {
    registrarCompra,
    calcularPrecioUnidad
}
