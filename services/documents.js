const { DocumentCocodoc } = require("../lib/dao/DocumentCocodocDao");
const { PDFCocodoc } = require("../lib/pdfCocodoc");
const { DataDocument } = require("../lib/mongodb/documents");
const path = require("path");
const fs = require("fs");

class DocumentsService {
    constructor() {
        this._pdfCocodoc = new PDFCocodoc();
        this._documentCocodocDao = new DocumentCocodoc();
        this._dataDocument = new DataDocument();
    }
    createPdf = (body, user) => {
        return new Promise(async(resolve, reject) => {
            var locationSystem = "";
            try {
                const resultDoc = await this._pdfCocodoc.createDoc({
                    nameFile: body.title,
                    idFolderDestination: body.idFolder,
                    metadata: body,
                    files: body.documentsFiles,
                    nameCreator: user.PRIMER_NOMBRE.charAt(0).toUpperCase() +
                        user.PRIMER_NOMBRE.slice(1) +
                        " " +
                        user.SEGUNDO_NOMBRE.charAt(0).toUpperCase() +
                        user.SEGUNDO_NOMBRE.slice(1) +
                        " " +
                        user.PRIMER_APELLIDO.charAt(0).toUpperCase() +
                        user.PRIMER_APELLIDO.slice(1) +
                        " " +
                        user.SEGUNDO_APELLIDO.charAt(0).toUpperCase() +
                        user.SEGUNDO_APELLIDO.slice(1)
                });
                locationSystem = resultDoc.locationSystem;
                delete resultDoc.locationSystem;
                const resultDb = await this._documentCocodocDao.createDocumentCocodoc({
                    idDocumet: resultDoc.idDoc,
                    nameDocument: resultDoc.nameDocument,
                    registrationDate: new Date(),
                    lastModification: new Date(),
                    idFolder: body.idFolder,
                    idUser: user.ID
                });
                const respDocuments = await this._dataDocument.insertPdf({
                    documentPdf: {...body, ...resultDoc },
                    user: user
                });

                resolve({...resultDoc });
            } catch (error) {
                console.error('ERROR:::', error);
                fs.unlink(locationSystem, async error => {
                    if (error) reject(error);
                });
                reject(error);
            } finally {
                body.documentsFiles.forEach(element => {
                    fs.unlink(element, error => {
                        if (error) console.log(error);
                    });
                });
            }
        });
    };

    getPdf = idDocument => {
        return new Promise((resolve, reject) => {
            this._documentCocodocDao
                .getDocumentCocodoc({ idDoc: idDocument })
                .then(resp => {
                    const { path_system_folder, id_doc, name_doc } = resp;
                    resolve(path.join(path_system_folder, `${id_doc}-${name_doc}`));
                })
                .catch(reject);
        });
    };

    getAllPdf = () => {
        return new Promise((resolve, reject) => {
            this._dataDocument
                .findAllDataOfPdfs()
                .then(resp => {
                    resolve(resp);
                })
                .catch(reject);
        });
    };

    searchPdf = ({ _query, queryParam }) => {
        return new Promise((resolve, reject) => {
            var obj = {}
            obj[`${_query}`] = new RegExp(`${queryParam}`)
            this._dataDocument
                .findDataOfPdf({ query: obj })
                .then(resp => {
                    resolve(resp);
                })
                .catch(reject);
        });
    };
}
module.exports.DocumentsService = DocumentsService;

// var s = new DocumentsService()
// s.searchPdf({ _query: 'title', queryParam: 'evaluacion de riesgo alcantarilado' })
//     .then(resp => console.log(resp))
//     .catch(error => console.log(error))