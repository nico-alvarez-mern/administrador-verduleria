"use strict";
const Joi = require("@hapi/joi");

const guardarVentaDbValidador = Joi.object({
    total : Joi.number().required(),
    total_kg : Joi.number().required(),
    total_unidad : Joi.number().required(),
    costo_unidad : Joi.number().required()
});

module.exports = {
    guardarVentaDbValidador
}