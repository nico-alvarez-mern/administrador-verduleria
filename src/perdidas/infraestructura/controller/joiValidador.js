"use strict";
const Joi = require("@hapi/joi");

const guardarPerdidaDbValidador = Joi.object({
    kg : Joi.number().required()
});

module.exports = {
    guardarPerdidaDbValidador
}