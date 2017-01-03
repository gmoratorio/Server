const express = require('express');
const router = express.Router();
const Scrape = require('../aggregates/scrape');
const RSS = require('../aggregates/rss');



router.get('/denverpost', (req, res) => {
    const denverPostURL = `http://feeds.denverpost.com/dp-entertainment?format=xml`;
    // RSS.getXML(requestURL)
    // .then((html) => {
    RSS.getContent(denverPostURL)
        .then((feed) => {
            res.json(feed);
        })

    .catch((err) => {
        console.log(err);
    });
    // })
});


router.get('/westword', (req, res) => {
    const westwordURL = `http://www.westword.com/calendar.rss`;
    // RSS.getXML(requestURL)
    // .then((html) => {
    let objectArrayWithoutDateTime = [];
    RSS.getContent(westwordURL)
        .then((rawEventObjectArray) => {
            let cleanEventObjectArray = rawEventObjectArray.map((eventObject) => {
                return (RSS.createCleanObject(eventObject, "WestWord"));
            });
            // return Promise.all(cleanEventObjectArray);
            res.json(rawEventObjectArray);
        })
        // .then((objectArray) => {
        //     objectArrayWithoutDateTime = objectArray;
        //     let htmlArray = objectArray.map((objectArray) => {
        //         return Scrape.getHTML(objectArray.link);
        //     });
        //
        //     return Promise.all(htmlArray);
        // })
        // .then((htmlArray) => {
        //     let dateTimeArray = htmlArray.map((html) => {
        //         return Scrape.getDateTimePrice(html);
        //     });
        //     return Promise.all(dateTimeArray);
        // })
        // .then((dateTimeArray) => {
        //   // console.log(dateTimeArray);
        //   res.json(objectArrayWithoutDateTime);
        // })
        .catch((err) => {
            console.log(err);
        });
    // })
});




module.exports = router;
