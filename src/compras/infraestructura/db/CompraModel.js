const { Schema, model} = require('mongoose');

const CompraSchema = Schema({
    fecha : {
        type: String,
    },
    nombre_producto : {
        type: String,
        required: true,
        unique : true
    },
    unidad_medida : {
        type: String,
        enum : ['kg','unidad'],
        default : 'kg',
    },
    cantidad : {
        type: Number,
        required : true
    },
    precio_total : {
        type : Number,
        required: true
    },
    precio_unidad : {
        type : Number,
        required: true
    }
});

CompraSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model('Compra',CompraSchema);

