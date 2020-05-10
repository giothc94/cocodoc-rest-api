const { DocumentCocodoc } = require("../lib/dao/DocumentCocodocDao");
const { FolderCocodoc } = require("../lib/dao/folderCocodocDao");
const { _pdfData } = require("../utils/schemas/verifyPdf");
const normalize = require("normalize-path")
const { config } = require("../config");
const PDFDoc = require("pdfkit");
const path = require("path");
const joi = require("@hapi/joi");
const fs = require("fs");
const fse = require("fs-extra");
const exiftool = require("node-exiftool");
const exiftoolBin = require("dist-exiftool");

const TEMP_IMG = `${config.tempImg}`;

class PDFCocodoc {
    constructor() {
        this.docDb = new DocumentCocodoc();
        this.folderCocodoc = new FolderCocodoc();
        this.ep = new exiftool.ExiftoolProcess(exiftoolBin);
    }

    createDoc({ nameFile, idFolderDestination, metadata, files, nameCreator }) {
        return new Promise(async(resolve, reject) => {
            try {
                const existFolder = await this.folderCocodoc.checkFolderExistenceById(
                    idFolderDestination
                );
                if (existFolder) {
                    const {
                        folder: { path_system_folder, path_user_folder }
                    } = await this.folderCocodoc.getFolderById(idFolderDestination);
                    const doc = new PDFDoc({ autoFirstPage: false });
                    const id = Date.now();
                    const name = `${id}-${nameFile
            .trim()
            .replace(/ /g, "_")
            .toLowerCase()}.pdf`;
                    const documentDestination = path.join(path_system_folder, name);
                    doc.pipe(fs.createWriteStream(documentDestination));
                    for (let element of files) {
                        doc
                            .addPage({ size: [595.28, 841.89] })
                            .image(`${element}`, 0, 0, { width: 595.28, height: 841.89 });
                    }
                    doc.info = {
                        Author: "Comuna San José de Cocotog",
                        IssuingEntity: metadata.issuingEntity,
                        Subject: metadata.subject,
                        CreationDate: new Date(),
                        Creator: nameCreator,
                        Keywords: metadata.keywords.toString(),
                        ModDate: new Date(),
                        Producer: "Cocodoc System",
                        Title: metadata.title,
                        Comment: metadata.comment,
                        NumberOfSheetsOriginalDocument: metadata.numberOfSheetsOriginalDocument,
                        Segment: metadata.segment
                    };
                    doc.on("end", () => {
                        resolve({
                            idDoc: name.split("-").shift(),
                            nameDocument: name.split("-").pop(),
                            createdBy: nameCreator,
                            location: normalize(path.join(path_user_folder, name.split("-").pop())),
                            locationSystem: documentDestination
                        });
                    });
                    doc.end();
                }
            } catch (error) {
                console.log(error);
                reject({
                    created: false,
                    ...error
                });
            }
        });
    }

    uploadDoc({ nameFile, idFolderDestination, metadata, files, nameCreator }) {
        return new Promise(async(resolve, reject) => {
            try {
                const existFolder = await this.folderCocodoc.checkFolderExistenceById(
                    idFolderDestination
                );
                if (existFolder) {
                    const {
                        folder: { path_system_folder, path_user_folder }
                    } = await this.folderCocodoc.getFolderById(idFolderDestination);
                    const id = Date.now();
                    const name = `${id}-${nameFile
            .trim()
            .replace(/ /g, "_")
            .toLowerCase()}.pdf`;
                    const documentDestination = path.join(path_system_folder, name);
                    await fse.move(files, documentDestination);
                    let infoMetada = {
                        Author: "Comuna San José de Cocotog",
                        IssuingEntity: metadata.issuingEntity,
                        Subject: metadata.subject,
                        CreationDate: new Date(),
                        Creator: nameCreator,
                        Keywords: metadata.keywords.toString(),
                        ModDate: new Date(),
                        Producer: "Cocodoc System",
                        Title: metadata.title,
                        Comment: metadata.comment,
                        NumberOfSheetsOriginalDocument: metadata.numberOfSheetsOriginalDocument,
                        Segment: metadata.segment
                    };
                    await this.ep.open();
                    await this.ep.writeMetadata(documentDestination, infoMetada, [
                        "overwrite_original"
                    ]);
                    await this.ep.close();
                    resolve({
                        idDoc: name.split("-").shift(),
                        nameDocument: name.split("-").pop(),
                        createdBy: nameCreator,
                        location: normalize(path.join(path_user_folder, name.split("-").pop())),
                        locationSystem: documentDestination
                    });
                }
            } catch (error) {
                console.log(error);
                reject({
                    created: false,
                    ...error
                });
            }
        });
    }

    deleteDoc = ({ pathDoc }) => {
        return new Promise((resolve, reject) => {
            fse.move(
                pathDoc,
                path.join(config.pathPapelera, pathDoc.split("/").pop()),
                error => {
                    if (error) reject(error);
                    resolve({ ok: "documento eliminado" });
                }
            );
        });
    };
}
module.exports.PDFCocodoc = PDFCocodoc;