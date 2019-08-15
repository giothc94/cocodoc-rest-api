const express = require('express')
const router = express.Router()
const FileSystemService = require('./../../services/directory')

router
    .get('/', async function(req, res) {
        ds = new FileSystemService()
        const directory = await ds.getDirectory('Cocodoc')
        if (!directory.error) {
            res.status(200).json({
                data: directory,
                message: 'Directorio de Cocodoc',
                ok: true,
                status: 200,
                statusText: "Ok"
            })
        } else {
            res.status(404).json({
                response: directory.error.code,
                message: 'No su pudo obtener el directorio.',
                ok: false,
                status: 404,
                statusText: "Not found"
            })
        }
    })
    .post('/', async function(req, res) {
        newFolder = JSON.parse(JSON.stringify(req.body))
        ds = new FileSystemService()
        console.log('NEW FOLDER::', newFolder)
        if (newFolder) {
            const { key, name } = newFolder
            if (key && name) {
                let path = `${key}/${name}`
                console.log('KP:::', path)
                const created = await ds.createFolder(path)
                if (created.created === true) {
                    res.status(201).json({
                        data: created,
                        message: 'Carpeta creada',
                        ok: true,
                        status: 201,
                        statusText: "Created"
                    })
                } else {
                    res.status(400).json({
                        response: created,
                        message: 'No se creo ninguna carpeta',
                        ok: false,
                        status: 400,
                        statusText: "Bad Request"
                    })
                }
            } else {
                res.status(400).json({
                    response: 'Se necesita key y path en el body',
                    message: 'No se creo ninguna carpeta',
                    ok: false,
                    status: 400,
                    statusText: "Bad Request"
                })
            }
        } else {
            res.status(400).json({
                response: 'Sin argumentos',
                message: 'No se creo ninguna carpeta',
                ok: false,
                status: 400,
                statusText: "Bad Request"
            })
        }
    })
    .put('/', async function(req, res) {
        const { name, key } = JSON.parse(JSON.stringify(req.body))
        ds = new FileSystemService()
        if (key && name) {
            let oldName = key.split('/').pop()
            let newName = `${key.slice(0, key.length - oldName.length)}${name}`

            const renamed = await ds.renameFolder(key, newName)
            if (renamed.error) {
                res.status(400).json({
                    response: renamed,
                    message: 'No se modifico el nombre de la carpeta',
                    ok: false,
                    status: 400,
                    statusText: "Bad Request"
                })
            } else {
                res.status(201).json({
                    data: renamed,
                    message: 'Nombre de carpeta modificada',
                    ok: true,
                    status: 201,
                    statusText: "Created"
                })
            }
        } else {
            res.status(400).json({
                response: 'Se necesita key y name en el body',
                message: 'No se modifico ninguna carpeta',
                ok: false,
                status: 400,
                statusText: "Bad Request"
            })
        }
    })
    .delete('/', async(req, res) => {
        const { path } = JSON.parse(JSON.stringify(req.query))
        if (path) {
            ds = new FileSystemService()
            const deleted = await ds.removeFolder(path)
            if (deleted.error) {
                res.status(400).json({
                    response: deleted,
                    message: 'No se elimino ninguna carpeta',
                    ok: false,
                    status: 400,
                    statusText: "Bad Request"
                })
            } else {

                res.status(201).json({
                    data: deleted,
                    message: 'Carpeta eliminada',
                    ok: true,
                    status: 200,
                    statusText: "ok"
                })
            }
        } else {
            res.status(400).json({
                response: 'Se necesita el path en el body',
                message: 'No se elimino ninguna carpeta',
                ok: false,
                status: 400,
                statusText: "Bad Request"
            })
        }
    })
module.exports = router