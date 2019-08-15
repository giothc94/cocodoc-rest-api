var express = require('express');
var path = require('path')
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    const Firestore = require('@google-cloud/firestore');
    const db = new Firestore({
        projectId: 'cocodoc-1563257331101',
        keyFilename: `/home/giothcode/Escritorio/cocodocREST/Cocodoc-1738ee1630b1.json`,
    })
    let docRef = db.collection('users').doc('alovelace');

    let setAda = docRef.set({
        first: 'Ada',
        last: 'Lovelace',
        born: 1815
    });
    res.render('index', { title: 'Express' });
});

module.exports = router;