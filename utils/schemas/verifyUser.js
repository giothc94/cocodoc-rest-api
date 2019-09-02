const Joi = require("@hapi/joi");

const _UserIdSchema = {
    id: Joi.number()
        .integer()
        .positive()
        .required()
};

const _UserCreateSchema = {
    cedula: Joi.string()
        .min(10)
        .max(13)
        .regex(/^[0-9]{10,13}$/)
        .required(),
    pNombre: Joi.string()
        .regex(/^[a-zA-z]{2,25}$/)
        .lowercase()
        .required(),
    sNombre: Joi.string()
        .regex(/^[a-zA-z]{2,25}$/)
        .lowercase()
        .required(),
    pApellido: Joi.string()
        .regex(/^[a-zA-z]{2,25}$/)
        .lowercase()
        .required(),
    sApellido: Joi.string()
        .regex(/^[a-zA-z]{2,25}$/)
        .lowercase()
        .required(),
    idRol: Joi.number()
        .integer()
        .positive()
        .required()
};
const _UserUpdateSchema = {
    id: Joi.number()
        .integer()
        .positive()
        .required(),
    cedula: Joi.string()
        .min(10)
        .max(13)
        .regex(/^[0-9]{10,13}$/)
        .required(),
    pNombre: Joi.string()
        .regex(/^[a-zA-z]{2,25}$/)
        .lowercase()
        .required(),
    sNombre: Joi.string()
        .regex(/^[a-zA-z]{2,25}$/)
        .lowercase()
        .required(),
    pApellido: Joi.string()
        .regex(/^[a-zA-z]{2,25}$/)
        .lowercase()
        .required(),
    sApellido: Joi.string()
        .regex(/^[a-zA-z]{2,25}$/)
        .lowercase()
        .required(),
    idRol: Joi.number()
        .integer()
        .positive()
        .required()
};

module.exports = { _UserCreateSchema, _UserUpdateSchema, _UserIdSchema };