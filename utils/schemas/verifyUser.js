const Joi = require("@hapi/joi");

const _UserIdSchema = {
  id: Joi.number()
    .integer()
    .positive()
    .required()
};

const _UpdateUserPassword = {
  newPassword: Joi.string()
    .min(8)
    .max(20)
    .regex(/^[0-9A-Za-z]{8,20}$/)
    .required()
};

const _KeywordUserSearch = {
  keyword: Joi.string()
    .regex(/^[a-zA-z0-9]{2,25}$/)
    .lowercase()
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

module.exports = {
  _UserCreateSchema,
  _UserUpdateSchema,
  _UserIdSchema,
  _UpdateUserPassword,
  _KeywordUserSearch
};
