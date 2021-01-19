const Compra = require('./CompraModel');
const { registrarCompra } = require('../../dominio/compra');
const { actualizarValorPromedio } = require('../../../valor-promedio/infraestructura/db/valorPromedio');

const obtenerTodasLasCompras = async() =>{
    try {
        const compras = await Compra.find();
        return compras;
    }catch (error) {
        throw error;
    }
}

const guardarCompra = async(compra) =>{
    try {
        const nuevaCompra = new Compra( registrarCompra(compra) );
        const compraRegistrada = await nuevaCompra.save({isNew : true});
        await actualizarValorPromedio();
        return compraRegistrada;
    } catch (error) {
        throw error;
    }
}

const borrarCompra = async(id)=>{
    try {
        const compra = await Compra.findByIdAndRemove(id);
        await actualizarValorPromedio();
        return compra;        
    }catch(error) {
        throw error;
    }
}

const actualizarCompra = async(id,compraActualizar)=>{
    try {
        const compra = await Compra.findById(id);
        if(!compra){
            return null;
        }
        const compraActualizada = await Compra.findByIdAndUpdate(id, compraActualizar, {new:true});
        await actualizarValorPromedio();
        return compraActualizada;
    }catch(error) {
        throw error;
    }
}

module.exports = {
    guardarCompra,
    obtenerTodasLasCompras,
    borrarCompra,
    actualizarCompra
}