const MongoLib = require('../lib/mongo')
const { mysqlCon } = require('../lib/mysql');
const { getRoles, getUsers, create, getUser, deleteUser, updateUser } = require('../lib/queries/mysql/users/mysql');
const { createDocumentForUser } = require('../lib/queries/mongodb/users/mongo');

module.exports.User = class User {
    constructor(cedula, pNombre, sNombre, pApellido, sApellido, idRol) {
        this.cedula = cedula
        this.pNombre = pNombre
        this.sNombre = sNombre
        this.pApellido = pApellido
        this.sApellido = sApellido
        this.idRol = idRol
    }
}

class UsersServices {

    constructor() {
        this.collection = 'users'
        this.mongodb = new MongoLib()
    }

    async createUser(user) {
        const { cedula, pNombre, sNombre, pApellido, sApellido, idRol } = user || null
        if (cedula && pNombre && sNombre && pApellido && sApellido && idRol) {
            return await create(user)
                .then(response => {
                    createDocumentForUser(this.collection, user)
                    return response
                })
                .catch(err => {
                    return err
                })
        } else {
            return { message: 'Los campos del usuaio son incorrectos. Campos correctos { cedula:string, pNombre:string, sNombre:string, pApellido:string, sApellido:string, idRol:int }' }
        }
    }

    async getRoles() {
        return await getRoles()
            .then(roles => {
                return roles
            })
            .catch(err => {
                return err
            })
    }
    async getUsers() {
        return await getUsers()
            .then(users => {
                return users
            })
            .catch(err => {
                return err
            })
    }
    async getUser(id) {
        return await getUser(id)
            .then(user => {
                return user[0]
            })
            .catch(err => {
                return err
            })
    }
    async deleteUser(id) {
        return await deleteUser(id)
            .then(message => {
                return message
            })
            .catch(err => {
                return err
            })
    }
    async updateUser(user) {
        const { id, cedula, pNombre, sNombre, pApellido, sApellido, idRol } = user || null
        if (id && cedula && pNombre && sNombre && pApellido && sApellido && idRol) {
            return await updateUser(user)
                .then(response => {
                    return response
                })
                .catch(err => {
                    return err
                })
        } else {
            return { message: 'Los campos del usuaio son incorrectos. Campos correctos { id:int, cedula:string, pNombre:string, sNombre:string, pApellido:string, sApellido:string, idRol:int }' }
        }
    }
}

module.exports = UsersServices;