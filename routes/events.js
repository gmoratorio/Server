const express = require('express');
const router = express.Router();
const knex = require('../db/connection');
const posting = require("../functions/posting");
const scrape = require("../functions/scrape");

router.get('/', (req, res, next) => {
  let readyForScrape = true;
  
    scrape.dearDenver()
        .then((ddReturnObject) => {
            if ((ddReturnObject.eventArray.length > 0) && (readyForScrape === true)) {
                const ddPostObject = ddReturnObject.eventArray;
                return posting.postToDB(ddPostObject);
            } else {
                return {
                    message: "returned an empty array"
                };
            }
        })
        .then((result) => {
            console.log("Dear Denver: " + result.message);
        })
        .then(() => {
            return scrape.westWord();
        })
        .then((wwReturnObject) => {
            if (wwReturnObject.eventArray !== null) {
                const wwPostObject = wwReturnObject.eventArray;
                return posting.postToDB(wwPostObject);
            } else {
                return {
                    message: "returned null"
                };
            }
        })
        .then((result) => {
            console.log("WestWord: " + result.message);
        })
        .then(() => {
            return knex('event')
                .select()
        })
        .then(data => {
            res.json(data);
        })
        .catch(function(err) {
            next(err);
        });



});

router.post('/', function(req, res, next) {
    const eventArray = req.body.eventArray;
    // console.log(eventArray);
    posting.postToDB(eventArray)
        .then((result) => {
            res.json(result);
        })
        .catch(function(err) {
            next(err);
        });

});

// knex('/scrape/deardenver').insert({
//     sourceName: req.body.sourceName,
//     eventLink: req.body.eventLink,
//     description: req.body.description,
//     date: req.body.date,
//     time: req.body.time,
//     eventName: req.body.eventName,
// }).then(data => {
//     res.json(data);
// });

module.exports = router;
