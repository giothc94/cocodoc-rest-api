const Joi = require('@hapi/joi')

class VerifyUser {
    constructor() {
        this._UserCreateSchema = {
            cedula: Joi.string().min(10).max(13).regex(/^[0-9]{10,13}$/).required(),
            pNombre: Joi.string().regex(/^[a-zA-z]{2,25}$/).lowercase().required(),
            sNombre: Joi.string().regex(/^[a-zA-z]{2,25}$/).lowercase().required(),
            pApellido: Joi.string().regex(/^[a-zA-z]{2,25}$/).lowercase().required(),
            sApellido: Joi.string().regex(/^[a-zA-z]{2,25}$/).lowercase().required(),
            idRol: Joi.number().integer().positive().required()
        }
        this._UserUpdateSchema = {
            id: Joi.number().integer().positive().required(),
            cedula: Joi.string().min(10).max(13).regex(/^[0-9]{10,13}$/).required(),
            pNombre: Joi.string().regex(/^[a-zA-z]{2,25}$/).lowercase().required(),
            sNombre: Joi.string().regex(/^[a-zA-z]{2,25}$/).lowercase().required(),
            pApellido: Joi.string().regex(/^[a-zA-z]{2,25}$/).lowercase().required(),
            sApellido: Joi.string().regex(/^[a-zA-z]{2,25}$/).lowercase().required(),
            idRol: Joi.number().integer().positive().required()
        }
    }

    verifyUserForCreate = (user) => {
        return new Promise((resolve, reject) => {
            Joi.validate(user, this._UserCreateSchema, (error, value) => {
                if (error) {
                    reject({ verified: false, error: JSON.parse(JSON.stringify(error)).details })
                } else {
                    resolve({ verified: true, user: value })
                }
            })
        })
    }
    verifyUserForUpdate = (user) => {
        return new Promise((resolve, reject) => {
            Joi.validate(user, this._UserUpdateSchema, (error, value) => {
                if (error) {
                    reject({ verified: false, error: JSON.parse(JSON.stringify(error)).details })
                } else {
                    resolve({ verified: true, user: value })
                }
            })
        })
    }
}
module.exports.VerifyUser = VerifyUser
    // const user = {
    //     cedula: '1716715972',
    //     pNombre: 'gabriel',
    //     sNombre: 'geovanny',
    //     pApellido: 'arguello',
    //     sApellido: 'costta',
    //     idRol: 3
    // }

// const v = new VerifyUser()
// v.verifyUserForCreate(user)
//     .then(r => console.log(r))
//     .catch(e => console.log(e))