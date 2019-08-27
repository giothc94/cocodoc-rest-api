const Joi = require('@hapi/joi')
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

class VerifyPdf {
    constructor() {
        this._pdfRecord = {
            idDocuments: Joi.string().regex(/^[0-9]{10,50}$/).required(),
            nameDocument: Joi.string().regex(/^[a-z ]{2,50}$/).required(),
            registrationDateDocument: Joi.date().required(),
            lastModificationDocument: Joi.date().required(),
            idFolder: Joi.string().regex(/^[0-9]{10,50}$/).required()
        }

        this._pdfCreate = {
            title: Joi.string().regex(/^[a-z ]{2,50}$/).required(),
            subject: Joi.string().regex(/^[a-z ]{2,50}$/).required(),
            coment: Joi.string().regex(/^[a-z ]{2,50}$/).required(),
            broadcastDate: Joi.date().required(),
            receptionDate: Joi.date().required(),
            keywords: Joi.array().items(Joi.string()).required(),
            idFolder: Joi.string().regex(/^[0-9]{10,50}$/).required(),
            segment: Joi.string().regex(/^[0-9-]+$/).required(),
            issuingEntity: Joi.string().regex(/^[a-z ]{2,50}$/).required(),
            receivingEntity: Joi.string().regex(/^[a-z ]{2,50}$/).required(),
            numberOfSheetsOriginalDocument: Joi.number().integer().positive().required(),
            responsibleObservation: Joi.string().regex(/^[a-zA-Z ]{2,50}$/).max(50).truncate().required(),
            documentsFiles: Joi.array().items(Joi.string()).required(),
            idUser: Joi.number().integer().positive().required()
        }

        this._pdfData = {
            title: Joi.string().regex(/^[a-z ]{2,50}$/).required(),
            subject: Joi.string().regex(/^[a-z ]{2,50}$/).required(),
            coment: Joi.string().regex(/^[a-z ]{2,50}$/).required(),
            broadcastDate: Joi.date().required(),
            receptionDate: Joi.date().required(),
            keywords: Joi.array().items(Joi.string()).required(),
            idFolder: Joi.string().regex(/^[0-9]{10,50}$/).required(),
            segment: Joi.string().regex(/^[0-9-]+$/).required(),
            issuingEntity: Joi.string().regex(/^[a-z ]{2,50}$/).required(),
            receivingEntity: Joi.string().regex(/^[a-z ]{2,50}$/).required(),
            numberOfSheetsOriginalDocument: Joi.number().integer().positive().required(),
            responsibleObservation: Joi.string().regex(/^[a-zA-Z ]{2,50}$/).max(50).truncate().required(),
            personInCharge: Joi.object().keys({
                idUser: Joi.number().integer().positive().required(),
                rolUser: Joi.number().integer().positive().required(),
                registrationDateDocument: Joi.date().required(),
            }).required(),
        }

    }

    verifyPdfCreate = dataPdfCreate => {
        return new Promise((resolve, reject) => {
            Joi.validate(dataPdfCreate, this._pdfCreate, (error, value) => {
                if (error) {
                    reject({ verified: false, error: JSON.parse(JSON.stringify(error)).details })
                } else {
                    resolve({ verified: true, dataForCreate: value })
                }
            })
        })
    }
    verifyPdfData = dataPdfData => {
        return new Promise((resolve, reject) => {
            Joi.validate(dataPdfData, this._pdfData, (error, value) => {
                if (error) {
                    reject({ verified: false, error: JSON.parse(JSON.stringify(error)).details })
                } else {
                    resolve({ verified: true, dataForPersistence: value })
                }
            })
        })
    }
    verifyPdfRecord = dataPdfRecord => {
        return new Promise((resolve, reject) => {
            Joi.validate(dataPdfRecord, this._pdfRecord, (error, value) => {
                if (error) {
                    reject({ verified: false, error: JSON.parse(JSON.stringify(error)).details })
                } else {
                    resolve({ verified: true, dataForRecord: value })
                }
            })
        })
    }
}

module.exports.VerifyPdf = VerifyPdf

// pdfCreate = {
//     title: 'un titulo para el pdfefef',
//     subject: 'un asunto para el pdf',
//     coment: 'un comentario para el pdf',
//     broadcastDate: Date.now(),
//     receptionDate: Date.now(),
//     keywords: ['una', 'palabra', 'clave', 'para', 'el', 'pdf'],
//     idFolder: '1566075783857',
//     segment: '01-20',
//     issuingEntity: 'municipio de quito',
//     receivingEntity: 'san jose de cocotog',
//     numberOfSheetsOriginalDocument: '20',
//     responsibleObservation: 'El documento no se encuentra en buen estado',
//     documentsFiles: ['La ruta de algun archivo', 'La ruta de algun archivo', 'La ruta de algun archivo', 'La ruta de algun archivo', 'La ruta de algun archivo'],
//     idUser: 1
// }

// pdfData = {
//     title: 'un titulo para el pdfefef',
//     subject: 'un asunto para el pdf',
//     coment: 'un comentario para el pdf',
//     broadcastDate: Date.now(),
//     receptionDate: Date.now(),
//     keywords: ['una', 'palabra', 'clave', 'para', 'el', 'pdf'],
//     idFolder: '1566075783857',
//     segment: '01-20',
//     issuingEntity: 'municipio de quito',
//     receivingEntity: 'san jose de cocotog',
//     numberOfSheetsOriginalDocument: '20',
//     responsibleObservation: 'El documento no se encuentra en buen estado',
//     personInCharge: {
//         idUser: 1,
//         rolUser: 8,
//         registrationDateDocument: Date.now()
//     }
// }

// var pdf = new VerifyPdf()
// pdf.verifyPdfData(pdfData)
//     .then(resp => {
//         console.log(resp)
//     })
//     .catch(error => {
//         console.log(error)
//     })