const express = require('express');
const router = express.Router();
const Scrape = require('../aggregates/scrape');




router.get('/deardenver', (req, res) => {
    const requestURL = `https://deardenver.net/`;
    Scrape.getHTML(requestURL)
        .then((html) => {
            Scrape.getPostNumbers(html)
                .then((postNumbers) => {
                    posts = postNumbers.posts;
                    let postLinkPromises = posts.map(post => {
                        return Scrape.getPostLink(html, post);
                    });
                    return Promise.all(postLinkPromises);
                })
                .then((postLinkPromises) => {
                    let innerHtmlPromises = postLinkPromises.map((link) => {
                        return Scrape.getHTML(link)
                    });
                    return Promise.all(innerHtmlPromises);
                })
                .then((innerHtmlPromises) => {
                    let eventPromises = innerHtmlPromises.map((pageHtml) => {
                        return Scrape.getEventInfo(pageHtml, "Dear Denver");
                    })
                    return Promise.all(eventPromises);
                })
                .then((eventPromises) => {
                    res.json(eventPromises);
                })
                .catch((err) => {
                    console.log(err);
                });
        })
});





module.exports = router;
