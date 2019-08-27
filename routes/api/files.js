const express = require('express')
const router = express.Router()
const { config } = require('../../config');

const fs = require('fs')

const fse = require('fs-extra')

const path = require('path');

const os = require('os')

const DIR_NAME = `${config.dirRoot}`
    // const FileSystemService = require('./../../services/directory')
const TEMP_IMG = `${config.tempImg}`
const { PDFCocodoc, DOC_COCODOC } = require('../../lib/pdfCocodoc')

router
/**
 * Lista de parametros que se debe recibir
 * title
 * subject
 * coment
 * brodcastDate
 * receptionDate
 * keywords
 * idFolder
 * segment
 * issuingEntity
 * receivingEntity
 * numberOfSheets
 * numberOfSheetsOriginalDocument
 * responsibleObservation
 * documentsFiles
 * images
 * 
 */
    .post('/', async function(req, res) {
        var { files } = req
        var { body } = req
        var listImgs = Array.from(body.documentsFiles, x => path.join(TEMP_IMG, x))
        body.documentsFiles = listImgs
        console.log(body)

        // for (const img of files.images) {
        //     img.mv(path.join(TEMP_IMG, img.name), (error) => {
        //         if (error) {
        //             res.status(400).json({
        //                 error: error,
        //                 message: 'No se creo ninguna carpeta',
        //                 ok: false,
        //                 status: 400,
        //                 statusText: "Bad Request"
        //             })
        //         };
        //     })
        // }
        // setTimeout(() => {
        //     doc = new PDFCocodoc()
        //     doc.createDoc(body.titulo, { data: 'metadata' }, listImgs)
        //     console.log('BODY', body)
        //     listImgs.forEach((element) => {
        //         fs.unlink(element, (error) => { if (error) console.log(error) })
        //     })
        //     res.status(200).json({
        //         respuesta: body
        //     })
        // }, 1000);
    })
    .get('/', async function(req, res) {
        // newFolder = JSON.parse(JSON.stringify(req))
        // const PDFDoc = require('pdfkit')
        // PDFDoc.pipe(fs.createWriteStream(res))
        // ds = new FileSystemService()
        let p = '/home/giothcode/Escritorio/cocodocREST/public/documentos/Arguello_Geovanny_Introduccion_a_herramientas_de_explotacion_web_[SEGURIDAD_INFORMATICA]_2019.pdf'
        fs.createReadStream(p).pipe(res)
            // fs.readFile(p, (error, data) => {
            //         if (error) {
            //             res.status(400).json({
            //                 respuesta: error
            //             })
            //         } else {
            //             // res.contentType('application/pdf')
            //             res.send(data)
            //         }
            //     })
            // res.download(p)
            // res.send(p)
    })

module.exports = router