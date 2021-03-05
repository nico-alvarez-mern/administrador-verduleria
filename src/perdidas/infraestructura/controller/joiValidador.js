"use strict";
const Joi = require("@hapi/joi");

const guardarPerdidaDbValidador = Joi.object({
    kg : Joi.number().required()
});

const guardarCMVValidador = Joi.object({
    total : Joi.number().required()
});

module.exports = {
    guardarPerdidaDbValidador,
    guardarCMVValidador
}