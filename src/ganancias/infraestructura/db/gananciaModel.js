const {Schema,model} = require('mongoose');
const moment = require('moment');

const GananciaSchema = Schema({
    fecha : {
        type : String,
        default : moment().format(process.env.DATE_FORMAT)
    },
    total : {
        type : Number,
        required : true
    }
});

module.exports = model('Ganancia', GananciaSchema );