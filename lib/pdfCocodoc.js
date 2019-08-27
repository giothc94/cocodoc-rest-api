const { config } = require('../config');

const PDFDoc = require('pdfkit')
const exiftool = require('node-exiftool')
const exiftoolBin = require('dist-exiftool')
const ep = new exiftool.ExiftoolProcess(exiftoolBin)
const path = require('path')
const fs = require('fs')
const fse = require('fs-extra')

// const DIR_NAME = `${config.dirRoot}/public/documentos`
const TEMP_IMG = `${config.tempImg}`

// const DIRNAME_LENGTH = DIR_NAME.length
// const DIR_NAME = `${}/public/documentos`
const dirTree = require('directory-tree')

const doc = {
    title: String,
    subject: String,
    coment: String,
    brodcastDate: Date,
    receptionDate: Date,
    keywords: Array,
    idFolder: String,
    segment: String,
    issuingEntity: String,
    receivingEntity: String,
    numberOfSheets: Int32Array,
    numberOfSheetsOriginalDocument: Int32Array,
    responsibleObservation: String,
    documentsFiles: Array,
    images: Array
}

class PDFCocodoc {
    // constructor(title, subject, coment, brodcastDate, receptionDate, keywords, idFolder, segment, issuingEntity, receivingEntity, numberOfSheets, numberOfSheetsOriginalDocument, responsibleObservation, documentsFiles, images) {
    constructor(body, ...images) {
        this.title = body.title
        this.subject = body.subject
        this.coment = body.coment
        this.brodcastDate = body.brodcastDate
        this.receptionDate = body.receptionDate
        this.keywords = body.keywords
        this.idFolder = body.idFolder
        this.segment = body.segment
        this.issuingEntity = body.issuingEntity
        this.receivingEntity = body.receivingEntity
        this.numberOfSheets = body.numberOfSheets
        this.numberOfSheetsOriginalDocument = body.numberOfSheetsOriginalDocument
            // this.responsibleObservation = body.responsibleObservation
        this.documentsFiles = body.documentsFiles
    }


    createDoc() {
        return new Promise((resolve, reject) => {
            const doc = new PDFDoc({ autoFirstPage: false })
            try {
                const id = Date.now()
                const name = `${id}-${nameFile}.pdf`
                const destination = path.join(TEMP_IMG, name)
                doc.pipe(fs.createWriteStream(destination))
                for (const element of imgs[0]) {
                    doc.addPage({ size: [595.28, 841.89] }).image(`${element}`, 0, 0, { width: 595.28, height: 841.89 })
                }
                doc.info = {
                    Author: 'Autor de prueba',
                    CreationDate: '',
                    Creator: '',
                    Keywords: '',
                    ModDate: '',
                    Producer: '',
                    Title: ''
                }
                doc.end()
                resolve({
                    created: true,
                    destination: destination
                })
            } catch (error) {
                reject({
                    created: false,
                    error: error
                })
            }
        })
    }
}
module.exports.PDFCocodoc = PDFCocodoc