const { MongoLib } = require("../mongo");
const { config } = require("../../config/index");

class DataDocument {
    constructor() {
        this._mongo = new MongoLib();
        this._collection = config.dbCollectionName;
    }

    insertPdf = ({ documentPdf, user }) => {
        return new Promise(async(resolve, reject) => {
            try {
                const {
                    CEDULA,
                    PRIMER_NOMBRE,
                    SEGUNDO_NOMBRE,
                    PRIMER_APELLIDO,
                    SEGUNDO_APELLIDO,
                    TIPO_USUARIO
                } = user;
                documentPdf.broadcastDate = new Date(documentPdf.broadcastDate).toString();
                documentPdf.receptionDate = new Date(documentPdf.receptionDate).toString();
                var newMetadata = documentPdf.keywords;
                delete documentPdf.keywords;
                delete documentPdf.documentsFiles;
                documentPdf.keywords = newMetadata.concat(Object.values(documentPdf));
                documentPdf.user = {
                    CEDULA,
                    PRIMER_NOMBRE,
                    SEGUNDO_NOMBRE,
                    PRIMER_APELLIDO,
                    SEGUNDO_APELLIDO,
                    TIPO_USUARIO
                };
                const db = await this._mongo.connect();
                db.collection(this._collection) //prettier-ignore
                    .insertOne(documentPdf, (error, { ops }) => {
                        if (error || !ops) {
                            reject(error);
                        } else {
                            resolve(ops[0]);
                        }
                    });
            } catch (error) {
                reject(JSON.parse(JSON.stringify(error)));
            }
        });
    };
    findAllDataOfPdfs = () => {
        return new Promise(async(resolve, reject) => {
            try {
                const db = await this._mongo.connect();
                db.collection(this._collection)
                    .find({})
                    .toArray((error, result) => {
                        if (error) reject(error);
                        resolve(result);
                    });
            } catch (error) {}
        });
    };
    findDataOfPdf = ({ query }) => {
        return new Promise(async(resolve, reject) => {
            try {
                const db = await this._mongo.connect();
                db.collection(this._collection)
                    .find(query)
                    .limit(10)
                    .sort()
                    .toArray((error, result) => {
                        if (error) reject(error);
                        resolve(result);
                    });
            } catch (error) {
                reject(JSON.parse(JSON.stringify(error)));
            }
        });
    };
    findDataOfFolder = ({ query }) => {
        return new Promise(async(resolve, reject) => {
            try {
                const db = await this._mongo.connect();
                db.collection(this._collection)
                    .find(query)
                    .sort()
                    .toArray((error, result) => {
                        if (error) reject(error);
                        resolve(result);
                    });
            } catch (error) {
                reject(JSON.parse(JSON.stringify(error)));
            }
        });
    };
    deleteDataPdf = ({ idDoc }) => {
        return new Promise(async(resolve, reject) => {
            const db = await this._mongo.connect();
            db.collection(this._collection).deleteOne({ idDoc: idDoc },
                (error, result) => {
                    if (error) reject(error);
                    resolve({ ok: result });
                }
            );
        });
    };
}
module.exports.DataDocument = DataDocument;

// var m = new DataDocument();
// m.findDataOfFolder({ query: { "idFolder" : "1583490183106" } })
// // m.deleteDataPdf({ idDoc: '1570496725070' })
//     .then(resp => console.log(resp))
//     .catch(error => console.log(error));

// m.insertPdf({
//         documentPdf: { nombre: "giovanny", process: "testing", test: { keywords: ['alcantarillado', '2018', 'agosto'] } }
//     })
//     .then(resp => console.log(resp))
//     .catch(error => console.log(error));
// m.findAllDataOfPdfs()
//     .then(resp => console.log(resp))
//     .catch(error => console.log(error));