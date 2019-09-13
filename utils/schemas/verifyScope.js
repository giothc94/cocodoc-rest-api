const Joi = require("@hapi/joi");

const _CreateScopeSchema = {
    nameScope: Joi.string()
        .regex(/^[a-z:]{7,40}$/)
        .lowercase()
        .required(),
    keyRol: Joi.string()
        .max(256)
        .required()
};
const _KeyRolSchema = {
    keyRol: Joi.string()
        .max(256)
        .required()
};

module.exports = { _CreateScopeSchema, _KeyRolSchema };