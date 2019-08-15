const express = require('express')
const router = express.Router()

router.get('/', function(req, res) {
    const { query } = req.query
    res.status(200).json({
        data: "My data",
        message: 'Docs obtenidos'
    })
})

router.get('/:idDoc', function(req, res) {
    const { idDoc } = req.params
    res.status(200).json({
        data: "My data",
        message: 'Doc obtenido'
    })
})

router.post('/', function(req, res) {
    console.log('REQUEST', req)
    res.status(201).json({
        data: "My data",
        message: 'Datos creados'
    })
})

module.exports = router