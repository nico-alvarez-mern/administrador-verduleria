const {Schema, model} = require('mongoose');
const moment = require('moment');

const PerdidasSchema = Schema({
    fecha : {
        type : String,
        default : moment().format(process.env.DATE_FORMAT)
    },
    kg : {
        type : Number,
        required : true
    },
    valor : {
        type : Number,
        required : true
    }
});

module.exports = model('Perdidas', PerdidasSchema);