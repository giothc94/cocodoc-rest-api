const Joi = require('@hapi/joi')

class VerifyFolder {
    constructor() {
        this._folderCreate = {
            destinationFolderCode: Joi.string().regex(/^[0-9]{10,50}$/).required(),
            nameFolder: Joi.string().regex(/^[a-z ]{2,50}$/).lowercase().required()
        }

        this._folderUpdate = {
            idFolder: Joi.string().regex(/^[0-9]{10,50}$/).required(),
            newNameFolder: Joi.string().regex(/^[a-z ]{2,50}$/).lowercase().required()
        }

        this._folderIdSchema = {
            idFolder: Joi.string().regex(/^[0-9]{10,50}$/).required()
        }
    }

    verifyIdFolderSchema = (body) => {
        return new Promise((resolve, reject) => {
            Joi.validate(body,
                this._folderIdSchema,
                (error, value) => {
                    if (error) {
                        reject({ verified: false, error: JSON.parse(JSON.stringify(error)).details })
                    } else {
                        resolve({ verified: true, data: value })
                    }
                })
        })
    }

    verifyFolderForCreate = (body) => {
        return new Promise((resolve, reject) => {
            Joi.validate(body, this._folderCreate, (error, value) => {
                if (error) {
                    reject({ verified: false, error: JSON.parse(JSON.stringify(error)).details })
                } else {
                    resolve({ verified: true, data: value })
                }
            })
        })
    }

    verifyFolderForUpdate = (body) => {
        return new Promise((resolve, reject) => {
            Joi.validate(body, this._folderUpdate, (error, value) => {
                if (error) {
                    reject({ verified: false, error: JSON.parse(JSON.stringify(error)).details })
                } else {
                    resolve({ verified: true, data: value })
                }
            })
        })
    }
}
module.exports.VerifyFolder = VerifyFolder