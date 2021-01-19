"use strict";
const Joi = require("@hapi/joi");

const guardarVentaDbValidador = Joi.object({
    total : Joi.number().required()
});

module.exports = {
    guardarVentaDbValidador
}