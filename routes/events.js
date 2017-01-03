const express = require('express');
const router = express.Router();
const knex = require('../db/connection');

router.get('/', (req, res, next) => {
    return knex('event')
        .select()
        .then(data => {
            res.json(data);
        });
});

router.post('/', function(req, res, next) {
    const eventArray = req.body.eventArray;
    console.log(eventArray);
    var inserts = eventArray.map(function (event){
        return knex('event').insert({
                sourceName: event.sourceName,
                eventLink: event.eventLink,
                description: event.description,
                date: event.date,
                time: event.time,
                eventName: event.eventName
        });
    });
    Promise.all(inserts).then(function () {
        res.json({
            message: 'success'
        });
    }).catch(function (err) {
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
