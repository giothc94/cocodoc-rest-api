const Joi = require("@hapi/joi");
/**
     * Lista de parametros para mysql
     
     * `id_documents`,
     * `name_doc`,
     * `registration_date_doc`,
     * `last_modification_doc`,
     * `id_folder`
     *
     * /

    /**
     * Lista de parametros que se debe recibir para crear pdf
     * title
     * subject
     * coment
     * brodcastDate
     * receptionDate
     * keywords
     * idFolder
     * segment
     * issuingEntity
     * receivingEntity
     * numberOfSheets
     * numberOfSheetsOriginalDocument
     * responsibleObservation
     * documentsFiles
     * images
     */

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
        .regex(/^[a-z ]{2,50}$/)
        .required(),
    subject: Joi.string()
        .regex(/^[a-z ]{2,50}$/)
        .required(),
    coment: Joi.string()
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
    documentsFiles: Joi.array()
        .items(Joi.string())
        .required(),
    idUser: Joi.number()
        .integer()
        .positive()
        .required()
};

const _pdfData = {
    title: Joi.string()
        .regex(/^[a-z ]{2,50}$/)
        .required(),
    subject: Joi.string()
        .regex(/^[a-z ]{2,50}$/)
        .required(),
    coment: Joi.string()
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

module.exports = { _pdfRecord, _pdfCreate, _pdfData };