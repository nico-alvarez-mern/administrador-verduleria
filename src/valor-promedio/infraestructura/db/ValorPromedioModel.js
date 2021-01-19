const {Schema,model} = require('mongoose');

const ValorPromedio = Schema({
    valor : {
        type : Number
    }
});

ValorPromedio.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model('ValorPromedio',ValorPromedio);