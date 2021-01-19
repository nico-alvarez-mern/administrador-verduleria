"use strict";
const Joi = require("@hapi/joi");

const guardarCompraDbValidador = Joi.object({
    nombre_producto : Joi.string().required(),
    unidad_medida : Joi.valid('kg','unidad'),
    cantidad : Joi.number().required(),
    precio_total : Joi.number().required()
});

module.exports = {
    guardarCompraDbValidador
}