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
            var response = null;
            this._pdfCocodoc
                .createDoc({
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
                })
                .then(resultDoc => {
                    locationSystem = resultDoc.locationSystem;
                    delete resultDoc.locationSystem;
                    response = resultDoc;
                    return resultDoc;
                })
                .then(_resultDoc => {
                    return this._documentCocodocDao.createDocumentCocodoc({
                        idDocumet: _resultDoc.idDoc,
                        nameDocument: _resultDoc.nameDocument,
                        registrationDate: new Date(),
                        lastModification: new Date(),
                        idFolder: body.idFolder,
                        idUser: user.ID
                    });
                })
                .then(() => {
                    return this._dataDocument.insertPdf({
                        documentPdf: {...body, ...response },
                        user: user
                    });
                })
                .then(() => {
                    resolve({...response });
                })
                .catch(error_catch => {
                    console.log(error_catch)
                    fs.unlink(locationSystem, error => {
                        if (error) reject(error);
                        if (response && response.idDoc) {
                            this._documentCocodocDao
                                .deleteDocumentCocodoc({ idDoc: response.idDoc })
                                .then(ok => {
                                    reject({...error_catch });
                                })
                                .catch(_error => {
                                    reject({...error_catch });
                                });
                        }
                    });
                })
                .then(() => {
                    body.documentsFiles.forEach(element => {
                        fs.unlink(element, error => {
                            if (error) console.log(error);
                        });
                    });
                });
        });
    };

    uploadPdf = (body, user) => {
        return new Promise(async(resolve, reject) => {
            var locationSystem = "";
            var response = null;
            this._pdfCocodoc
                .uploadDoc({
                    nameFile: body.title,
                    idFolderDestination: body.idFolder,
                    metadata: body,
                    files: body.destPdf,
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
                })
                .then(resultDoc => {
                    locationSystem = resultDoc.locationSystem;
                    delete resultDoc.locationSystem;
                    response = resultDoc;
                    return resultDoc;
                })
                .then(_resultDoc => {
                    return this._documentCocodocDao.createDocumentCocodoc({
                        idDocumet: _resultDoc.idDoc,
                        nameDocument: _resultDoc.nameDocument,
                        registrationDate: new Date(),
                        lastModification: new Date(),
                        idFolder: body.idFolder,
                        idUser: user.ID
                    });
                })
                .then(() => {
                    return this._dataDocument.insertPdf({
                        documentPdf: {...body, ...response },
                        user: user
                    });
                })
                .then(() => {
                    resolve({...response });
                })
                .catch(error_catch => {
                    console.log(error_catch)
                    fs.unlink(locationSystem, error => {
                        if (error) reject(error);
                        if (response && response.idDoc) {
                            this._documentCocodocDao
                                .deleteDocumentCocodoc({ idDoc: response.idDoc })
                                .then(ok => {
                                    reject({...error_catch });
                                })
                                .catch(_error => {
                                    reject({...error_catch });
                                });
                        }
                    });
                })
                .then(() => {
                    fs.unlink(body.destPdf, error => {
                        if (error) console.log(error);
                    });
                });
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
            var obj = {};
            obj[`${_query}`] = new RegExp(`${queryParam}`, 'ig');
            this._dataDocument
                .findDataOfPdf({ query: obj })
                .then(resp => {
                    resolve(resp);
                })
                .catch(reject);
        });
    };
    deletePdf = idDocument => {
        return new Promise(async(resolve, reject) => {
            this._documentCocodocDao
                .getDocumentCocodoc({ idDoc: idDocument })
                .then(resp => resp)
                .then(({ path_system_folder, id_doc, name_doc }) => {
                    const deletPath = path.join(
                        path_system_folder,
                        `${id_doc}-${name_doc}`
                    );
                    return this._pdfCocodoc.deleteDoc({ pathDoc: deletPath });
                })
                .then(() => this._dataDocument.deleteDataPdf({ idDoc: idDocument }))
                .then(() =>
                    this._documentCocodocDao.deleteDocumentCocodoc({ idDoc: idDocument })
                )
                .then(resolve)
                .catch(error => {
                    console.log(error);
                    reject(error);
                });
        });
    };
}
module.exports.DocumentsService = DocumentsService;

// var s = new DocumentsService()
// s.searchPdf({ _query: 'title', queryParam: 'evaluacion de riesgo alcantarilado' })
//     .then(resp => console.log(resp))
//     .catch(error => console.log(error))