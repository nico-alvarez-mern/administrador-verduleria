//cmv costo mercaderias vendidas
const calcularGanancias = (venta,valorPromedio)=>{
    const { total,total_kg, total_unidad, costo_unidad } = venta;
    const cmv =  calcularCMV(total_kg,valorPromedio,total_unidad,costo_unidad);
    return {
        total : total - cmv,
        cmv
    }
}

const calcularCMV = (totalKg,valorPromedio,totalUnidad,costoUnidad)=>{
    console.log(totalKg)
    console.log(valorPromedio)
    console.log(totalUnidad)
    console.log(costoUnidad)
    return (totalKg * valorPromedio) + (totalUnidad - costoUnidad);
}

module.exports = {
    calcularGanancias,
    calcularCMV
}