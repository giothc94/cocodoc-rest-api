const Joi = require("@hapi/joi");
const _documentQuery = {
    query: Joi.string()
        .regex(/^[a-zA-Z.]{4,50}$/),
    queryParam: Joi.string()
        .regex(/^[a-zA-z0-9-_ ]{1,100}$/)
};

const _idDocument = Joi.string()
    .regex(/^[0-9]{10,50}$/)
    .required();

const _pdfRecord = {
    idDocuments: Joi.string()
        .regex(/^[0-9]{10,50}$/)
        .required(),
    nameDocument: Joi.string()
        .regex(/^[a-z ]{2,50}$/)
        .required(),
    registrationDateDocument: Joi.date().required(),
    lastModificationDocument: Joi.date().required(),
    idFolder: Joi.string()
        .regex(/^[0-9]{10,50}$/)
        .required()
};
const _pdfCreate = {
    title: Joi.string()
        .regex(/^[a-z ]{2,200}$/)
        .required(),
    subject: Joi.string()
        .regex(/^[a-z ]{2,50}$/)
        .required(),
    comment: Joi.string()
        .regex(/^[a-z ]{2,500}$/)
        .required(),
    broadcastDate: Joi.date().required(),
    receptionDate: Joi.date().required(),
    keywords: Joi.array()
        .items(Joi.string())
        .required(),
    idFolder: Joi.string()
        .regex(/^[0-9]{10,50}$/)
        .required(),
    segment: Joi.string()
        .regex(/^[0-9-]+$/)
        .required(),
    issuingEntity: Joi.string()
        .regex(/^[a-z ]{2,50}$/)
        .required(),
    receivingEntity: Joi.string()
        .regex(/^[a-z ]{2,50}$/)
        .required(),
    numberOfSheetsOriginalDocument: Joi.number()
        .integer()
        .positive()
        .required(),
    responsibleObservation: Joi.string()
        .regex(/^[a-zA-Z ]{2,50}$/)
        .max(50)
        .truncate()
};

const _pdfData = {
    title: Joi.string()
        .regex(/^[a-z ]{2,50}$/)
        .required(),
    subject: Joi.string()
        .regex(/^[a-z ]{2,50}$/)
        .required(),
    comment: Joi.string()
        .regex(/^[a-z ]{2,50}$/)
        .required(),
    broadcastDate: Joi.date().required(),
    receptionDate: Joi.date().required(),
    keywords: Joi.array()
        .items(Joi.string())
        .required(),
    idFolder: Joi.string()
        .regex(/^[0-9]{10,50}$/)
        .required(),
    segment: Joi.string()
        .regex(/^[0-9-]+$/)
        .required(),
    issuingEntity: Joi.string()
        .regex(/^[a-z ]{2,50}$/)
        .required(),
    receivingEntity: Joi.string()
        .regex(/^[a-z ]{2,50}$/)
        .required(),
    numberOfSheetsOriginalDocument: Joi.number()
        .integer()
        .positive()
        .required(),
    responsibleObservation: Joi.string()
        .regex(/^[a-zA-Z ]{2,50}$/)
        .max(50)
        .truncate()
        .required(),
    personInCharge: Joi.object()
        .keys({
            idUser: Joi.number()
                .integer()
                .positive()
                .required(),
            rolUser: Joi.number()
                .integer()
                .positive()
                .required(),
            registrationDateDocument: Joi.date().required()
        })
        .required()
};

module.exports = { _pdfRecord, _pdfCreate, _pdfData, _idDocument, _documentQuery };