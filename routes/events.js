const express = require('express');
const router = express.Router();
const knex = require('../db/connection');
const posting = require("../functions/posting");
const scrape = require("../functions/scrape");


router.get('/', (req, res, next) => {
    let ddWasScrapedToday = true;
    let wwWasScrapedToday = true;
    scrape.scrapeTodayCheck()
        .then((resultsArray) => {
            ddWasScrapedToday = resultsArray[0];
            wwWasScrapedToday = resultsArray[1];
            if (ddWasScrapedToday === false) {
                return scrape.dearDenver();
            } else {
                return {
                    message: "was already scraped today"
                };
            }
        })
        .then((ddReturnObject) => {
            if (ddReturnObject.message) {
                return ddReturnObject;
            } else {
                if (ddReturnObject.eventArray.length > 0) {
                    const ddPostObject = ddReturnObject.eventArray;
                    return posting.postToDB(ddPostObject);
                } else {
                    return {
                        message: "returned an empty array"
                    };
                }
            }
        })
        .then((result) => {
            console.log("Dear Denver: " + result.message);
        })
        .then(() => {
            if (wwWasScrapedToday === false) {
                return scrape.westWord();
            } else {
                return {
                    message: 'was already scraped today'
                }
            }
        })
        .then((wwReturnObject) => {
            if (wwReturnObject.message) {
                return wwReturnObject;
            } else {
                if (wwReturnObject.eventArray !== null) {
                    if (wwWasScrapedToday === false) {
                        const wwPostObject = wwReturnObject.eventArray;
                        return posting.postToDB(wwPostObject);
                    } else {
                        return {
                            message: 'was already scrapped today'
                        }
                    }
                } else {
                    return {
                        message: "returned null"
                    };
                }
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

router.get('/existing', (req, res, next) => {
    return knex('event')
        .select()
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
