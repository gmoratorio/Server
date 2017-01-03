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
                  let returnObject = {};
                  const finalArray = eventPromises.reduce((acc, innerArray)=>{
                    const concatArray = acc.concat(innerArray);
                    return concatArray;
                  }, []);
                  returnObject.eventArray = finalArray;

                    res.json(returnObject);
                })
                .catch((err) => {
                    console.log(err);
                });
        })
});

router.get('/westword/:startDate/:endDate', (req, res) => {
    const startDate = req.params.startDate;
    const endDate = req.params.endDate;

    const baseURL = 'http://www.westword.com';
    const requestURL = `${baseURL}/calendar?dateRange[]=${startDate}&dateRange[]=${endDate}`;
    let eventArray = [];
    Scrape.getHTML(requestURL)
        .then((html) => {
            Scrape.getWWInitialEventInfo(html, "WestWord", baseURL)
                .then((initialEventArray) => {
                    eventArray = initialEventArray;
                    const innerEventHTMLArray = eventArray.map((event) => {
                        return Scrape.getHTML(event.eventLink);
                    })
                    return Promise.all(innerEventHTMLArray);
                })
                .then((htmlArray) => {
                    const descriptionArray = htmlArray.map((innerHTML) => {
                        return Scrape.getWWInnerDescription(innerHTML);
                    })
                    return Promise.all(descriptionArray);
                })
                .then((descriptionArray) => {
                    descriptionArray.forEach((description, index) => {
                        const thisEvent = eventArray[index];
                        thisEvent.description = description.trim();
                    });
                    return eventArray;
                })
                .then((eventArray) => {
                  let returnObject = {};
                  returnObject.eventArray = eventArray;
                    res.json(returnObject);
                })

            .catch((err) => {
                console.log(err);
            });

        })
});





module.exports = router;
