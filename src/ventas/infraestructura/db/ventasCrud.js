const Venta = require('./ventaModel');
const {
    devolverVentaMismoDia,
    sumarVentas
} = require('../../dominio/ventas');

const guardarVenta = async(fecha,venta)=>{
    try {
        const ventas = await findVentas();
        const yaHayVentaElMismoDia = devolverVentaMismoDia(fecha,ventas);
        if(yaHayVentaElMismoDia){
            const ventasSumadas = sumarVentas(venta,yaHayVentaElMismoDia)
            return await updateVenta(yaHayVentaElMismoDia._id,ventasSumadas);
        }
        return await saveVenta(venta);
    } catch (error) {
        throw error;
    }
}

const saveVenta = async(venta)=>{
    const nuevaVenta = new Venta(venta);
    return await nuevaVenta.save();
}

const updateVenta = async(id,venta)=>{
    return await Venta.findByIdAndUpdate(id,venta,{new : true});
}

const findVentas = async()=>{
    return await Venta.find();
}

module.exports = {
    guardarVenta,
    findVentas
}