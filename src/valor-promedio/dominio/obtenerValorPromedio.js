const calcularValorPromedio = (compras = []) => {
    const noHayComprasActualmente = compras.length < 1;
    if(noHayComprasActualmente){
        return 0;
    }
    const productosPorKG = compras.filter(  p => p.unidad_medida === 'kg' );
    let sumaPreciosUnidad = 0 
    productosPorKG.forEach( element =>{
        sumaPreciosUnidad += element.precio_unidad;
    });
    return Math.round(sumaPreciosUnidad / productosPorKG.length);
}

module.exports = {
    calcularValorPromedio
}

