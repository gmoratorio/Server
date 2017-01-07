

const express = require('express');
const router = express.Router();
const posting = require("../functions/posting");
const scrape = require("../functions/scrape");
const accessDB = require("../db/accessDB");
const masterGet = require("../functions/masterGet");


router.get('/', (req, res, next) => {
    masterGet.runMasterScrape()
        .then((returnObject) => {
            res.json(returnObject);
        })
});

router.get('/existing', (req, res, next) => {
    return accessDB.getAllEvents()
        .then(data => {
            res.json(data);
        })
        .catch(function(err) {
            next(err);
        });
});


router.post('/', function(req, res, next) {
    const eventArray = req.body.eventArray;
    posting.postToDB(eventArray)
        .then((result) => {
            res.json(result);
        })
        .catch(function(err) {
            next(err);
        });

});


module.exports = router;
