const Joi = require("@hapi/joi");

const _folderCreateSchema = {
    destinationFolderCode: Joi.string()
        .regex(/^[0-9]{10,50}$/)
        .required(),
    nameFolder: Joi.string()
        .regex(/^[a-z0-9 ]{2,50}$/)
        .lowercase()
        .required()
};

const _folderUpdateSchema = {
    idFolder: Joi.string()
        .regex(/^[0-9]{10,50}$/)
        .required(),
    newNameFolder: Joi.string()
        .regex(/^[a-z0-9 ]{2,50}$/)
        .lowercase()
        .required()
};

const _folderIdSchemaSchema = {
    idFolder: Joi.string()
        .regex(/^[0-9]{10,50}$/)
        .required()
};
module.exports = { _folderCreateSchema, _folderUpdateSchema, _folderIdSchemaSchema };