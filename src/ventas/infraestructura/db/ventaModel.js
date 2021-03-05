const {Schema,model} = require('mongoose');
const moment = require('moment');

const VentaSchema = Schema({
    fecha : {
        type : String,
        default : moment().format(process.env.DATE_FORMAT)
    },
    total : {
        type : Number,
        required : true
    },
    total_kg : {
        type : Number,
        required : true
    },
    total_unidad : {
        type : Number,
        default : 0
    },
    consto_unidad : {
        type : Number,
        default : 0
    }
});

VentaSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model('Venta',VentaSchema);

