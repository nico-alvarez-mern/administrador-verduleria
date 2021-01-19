const Compra = require('../../../compras/infraestructura/db/CompraModel');
const ValorPromedio = require('./ValorPromedioModel');
const {calcularValorPromedio} = require('../../dominio/obtenerValorPromedio');

const obtenerValorPromedio = async()=>{
    try {
        const valorPromedio = await ValorPromedio.find();
        return valorPromedio[0];
    } catch (error) {
        throw error;
    }
}

const actualizarValorPromedio = async()=> {
    try {
        const valorPromedio = await ValorPromedio.find();
        const compras = await obtenerTodasLasCompras();
        const yaHayUnValorPromedio = valorPromedio.length > 0;
        if(yaHayUnValorPromedio){
            await ValorPromedio.deleteMany();
        }
        const valor = calcularValorPromedio(compras);
        const nuevoValorPromedio = new ValorPromedio({valor});
        return await nuevoValorPromedio.save();
    } catch (error) {
        throw error;
    }
}

const obtenerTodasLasCompras = async() =>{
    try {
        const compras = await Compra.find();
        return compras;
    }catch (error) {
        throw error;
    }
}

module.exports = {
    actualizarValorPromedio,
    obtenerValorPromedio
}