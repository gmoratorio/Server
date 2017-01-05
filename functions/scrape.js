const Scrape = require('../aggregates/scrape');
const dates = require('../functions/dates');
const validation = require("../db/validation");
const knex = require('../db/connection');
const request = require("request");
const http = require("http");


module.exports = {

    dearDenver: function dearDenver() {
        const requestURL = `https://deardenver.net/`;
        const source = "Dear Denver";
        let postLinkPromiseArray = [];
        return Scrape.getHTML(requestURL)
            .then((html) => {
                return Scrape.getPostNumbers(html)
                    .then((postNumbers) => {
                        posts = postNumbers.posts;
                        let postLinkPromises = posts.map(post => {
                            return Scrape.getPostLink(html, post);
                        });
                        return Promise.all(postLinkPromises);
                    })
                    .then((postLinkPromises) => {
                        postLinkPromiseArray = postLinkPromises;
                        let latestDateArray = postLinkPromises.map((link) => {
                            return validation.returnLatestDate(source)
                        });
                        return Promise.all(latestDateArray);
                    })
                    .then((latestDateArray) => {
                        let filteredPostLinkPromises = postLinkPromiseArray.filter((link, index) => {
                            const latestDBDate = latestDateArray[index];
                            let thisScrapeDate = dates.getStartDateFromURL(link);
                            const diff = dates.getDifference(latestDBDate, thisScrapeDate, "hours");
                            const check = (diff > 0);
                            return check;
                        });
                        return Promise.all(filteredPostLinkPromises);
                    })
                    .then((filteredPostLinkPromises) => {
                        let innerHtmlPromises = filteredPostLinkPromises.map((link) => {
                            return Scrape.getHTML(link)
                        });
                        return Promise.all(innerHtmlPromises);
                    })
                    .then((innerHtmlPromises) => {
                        let eventPromises = innerHtmlPromises.map((pageHtml) => {
                            return Scrape.getEventInfo(pageHtml, source);
                        })
                        return Promise.all(eventPromises);
                    })
                    .then((eventPromises) => {
                        let returnObject = {};
                        const finalArray = eventPromises.reduce((acc, innerArray) => {
                            const concatArray = acc.concat(innerArray);
                            return concatArray;
                        }, []);
                        returnObject.eventArray = finalArray;
                        return (returnObject);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })
            .then((finalResult) => {
                return finalResult
            })
    },
    westWord: function westWord() {
        const source = "WestWord";
        const baseURL = 'http://www.westword.com';
        const maxFutureDate = dates.createMaxQueryDate();
        let queryEndDate = null;
        let eventArray = [];

        return validation.returnLatestDate(source)
            .then((latestDBDate) => {
                if (latestDBDate === null) {
                    latestDBDate = dates.createYesterday();
                }
                const dateQueryArray = dates.getNextWWQuery(latestDBDate, source);
                const startDate = dateQueryArray[0];
                const endDate = dateQueryArray[1];
                queryEndDate = endDate;
                const requestURL = `${baseURL}/calendar?dateRange[]=${startDate}&dateRange[]=${endDate}`;
                return Scrape.getHTML(requestURL)
            })
            .then((html) => {
                return Scrape.getWWInitialEventInfo(html, "WestWord", baseURL)
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
                        const dateDifference = dates.getDifference(queryEndDate, maxFutureDate, "days");
                        if (dateDifference > -1) {
                            returnObject.eventArray = eventArray;
                        } else {
                            returnObject.eventArray = null;
                        }
                        return (returnObject);
                    })
            })
            .then((finalResult) => {
                return finalResult;
            })
    },
    scrapeTodayCheck: function scrapeTodayCheck(source) {
        return new Promise((resolve, reject) => {
            return knex('date_scrape')
                .select()
                .then((scrapeDates) => {
                    const ddScrapeDate = scrapeDates[0].latest_date;
                    const wwScrapeDate = scrapeDates[1].latest_date;
                    const meetupScrapeDate = scrapeDates[2].latest_date;
                    const today = dates.createToday();
                    const ddDiff = dates.getDifference(ddScrapeDate, today, "hours");
                    const wwDiff = dates.getDifference(wwScrapeDate, today, "hours");
                    const meetupDiff = dates.getDifference(meetupScrapeDate, today, "hours");
                    const ddCheck = (ddDiff < 23);
                    const wwCheck = (wwDiff < 23);
                    const meetupCheck = (meetupDiff < 23);
                    resolve([ddCheck, wwCheck, meetupCheck]);
                })
        })
    },
    markTodayChecked: function markTodayChecked(source) {
        return new Promise((resolve, reject) => {
            const today = dates.createToday();
            const updateBody = {
                latest_date: today
            };
            return knex('date_scrape')
                .update(updateBody, 'latest_date')
                .where('name', source)
                .then((updatedDate) => {
                    resolve(updatedDate);
                })
        })
    },
    meetup: function meetup() {
        const source = "Meetup";
        const baseURL = "https://api.meetup.com";
        const APIKey = "5f4f457cf467f13496447404e22b";
        const fullURL = `${baseURL}/find/events?zip=11211&radius=1&category=25&order=members&key=${APIKey}`;
        let globalCleanedEventArray = [];

        return Scrape.getRequest(fullURL)
            .then((meetupRawEventArray) => {
                const cleanedEventArray = meetupRawEventArray.filter((event) => {
                    return (event.visibility === "public");
                })
                return Promise.all(cleanedEventArray);
            })
            .then((cleanedEventArray) => {
                globalCleanedEventArray = cleanedEventArray;
                const eventLinkArray = cleanedEventArray.map((event) => {
                    return event.link;
                })
                return Promise.all(eventLinkArray);
            })
            .then((eventLinkArray) => {
                const htmlArray = eventLinkArray.map((link) => {
                    return Scrape.getHTML(link);
                })
                return Promise.all(htmlArray);
            })
            .then((htmlArray) => {
                const dateTimeArray = htmlArray.map((html) => {
                    return Scrape.getMeetupDateTimeImageCategory(html);
                })
                return Promise.all(dateTimeArray);
            })
            .then((dateTimeArray) => {
                const finalEventArray = globalCleanedEventArray.map((event, index) => {
                    const cleanReturnEvent = {};
                    cleanReturnEvent.eventName = event.name;
                    cleanReturnEvent.scrapeID = event.id;
                    cleanReturnEvent.sourceName = source;
                    cleanReturnEvent.eventLink = event.link;
                    cleanReturnEvent.description = event.description;
                    if(event.venue){
                      cleanReturnEvent.location = event.venue.name;
                      cleanReturnEvent.address = event.venue.address_1;
                    }

                    const date = dateTimeArray[index].date;
                    const time = dateTimeArray[index].time;
                    const imageLink = dateTimeArray[index].imageLink;
                    const categories = dateTimeArray[index].categories;
                    cleanReturnEvent.date = date;
                    cleanReturnEvent.time = time;
                    cleanReturnEvent.imageLink = imageLink;
                    cleanReturnEvent.categories = categories;
                    return cleanReturnEvent;
                })
                return Promise.all(finalEventArray);
            })
            .then((finalEventArray) => {
              let returnArrayObject = {};
              returnArrayObject.eventArray = finalEventArray;
                return returnArrayObject;
            })

    //         source_name: event.sourceName,
    //         event_link: event.eventLink,
    //         description: event.description,
    //         date: event.date,
    //         time: event.time,
    //         event_name: event.eventName
    //
    //         "id": 1,
    // "source_name": "Dear Denver",
    // "event_link": "https://www.facebook.com/events/1864904230404701/",
    // "description": "Ratio is kicking off a new comedy series called Live at Ratio",
    // "date": "2016-12-28T07:00:00.000Z",
    // "time": "8 – 10pm",
    // "event_name": "Live Comedy Taping: Ian Douglas Terry",
    // "price": null,
    // "image_link": null,
    // "location": null,
    // "address": null


        // return validation.returnLatestDate(source)
        //     .then((latestDBDate) => {
        //         if (latestDBDate === null) {
        //             latestDBDate = dates.createYesterday();
        //         }
        //     })
        //     .then(() => {
        //         return request(fullURL, function(error, response, body) {
        //             if (!error && response.statusCode == 200) {
        //               return (body);
        //             }
        //         })
        //
        //     })

    }


}
