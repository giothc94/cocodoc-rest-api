const { DocumentCocodoc } = require("../lib/dao/DocumentCocodocDao");
const { PDFCocodoc } = require("../lib/pdfCocodoc");
const path = require("path");
const fs = require("fs");

class DocumentsService {
    constructor() {
        this._pdfCocodoc = new PDFCocodoc();
        this._documentCocodoc = new DocumentCocodoc();
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
                const resultDb = await this._documentCocodoc.createDocumentCocodoc({
                    idDocumet: resultDoc.idDoc,
                    nameDocument: resultDoc.nameDocument,
                    registrationDate: new Date(),
                    lastModification: new Date(),
                    idFolder: body.idFolder,
                    idUser: user.ID
                });
                // RESULT
                // {
                //     "idDoc": "1567832396527",
                //     "nameDocument": "one_name.pdf",
                //     "createdBy": "Geovanny Gabriel Arguello Costta",
                //     "location": "/cocodoc/alcantarillado/one_name.pdf",
                //     locationSystem: documentDestination
                // }
                body.documentsFiles.forEach(element => {
                    fs.unlink(element, error => {
                        if (error) console.log(error);
                    });
                });
                resolve({...resultDoc });
            } catch (error) {
                fs.unlink(locationSystem, error => {
                    if (error) reject(error);
                });
                body.documentsFiles.forEach(element => {
                    fs.unlink(element, error => {
                        if (error) console.log(error);
                    });
                });
                reject(error);
            }
        });
    };

    getPdf = idDocument => {
        return new Promise((resolve, reject) => {
            this._documentCocodoc
                .getDocumentCocodoc({ idDoc: idDocument })
                .then(resp => {
                    const { path_system_folder, id_doc, name_doc } = resp;
                    resolve(path.join(path_system_folder, `${id_doc}-${name_doc}`));
                })
                .catch(reject);
        });
    };
}
module.exports.DocumentsService = DocumentsService;