const MongoLib = require('../lib/mongo');

const { UserService } = require('../services/users')

class FolderServices {
    constructor() {
        this.collection = 'directorio'
        this.mongodb = new MongoLib()
    }

    async getDirectorio() {
        // var us = new UserService()
        // const newUser = {
        //     cedula: `1716715979`,
        //     pNombre: 'gardenia',
        //     sNombre: 'nimia',
        //     pApellido: 'hernandez',
        //     sApellido: 'costta',
        //     idRol: 7
        // }
        // // us.createUser(newUser);

        const folders = await this.mongodb.connect()
            .then(db => {
                return db.collection(this.collection).find().toArray()
            }).then(docs => {
                return docs
            })
        return folders || []
    }
}

module.exports = FolderServices;