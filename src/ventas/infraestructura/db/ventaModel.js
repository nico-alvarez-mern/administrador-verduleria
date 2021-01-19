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
    }
});

VentaSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model('Venta',VentaSchema);