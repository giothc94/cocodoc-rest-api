const MongoLib = require('../../../mongo')


async function createDocumentForUser(collection, user) {
    this.mongodb = new MongoLib()
    user.logsSesiones = []
    user.logsActividad = []
    await this.mongodb.connect()
        .then(db => {
            db.collection(collection).insertOne(user)
            console.log('Registro en mongo exitoso!!')
        })
        .catch(error => console.log(error))
}
module.exports.createDocumentForUser = createDocumentForUser