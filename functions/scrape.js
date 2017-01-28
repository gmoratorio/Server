

const Scrape = require('../aggregates/scrape');
const dates = require('../functions/dates');
const validation = require("../db/validation");
const request = require("request");
const http = require("http");
const accessDB = require("../db/accessDB");

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
                            return validation.returnLatestDate(source)
                    })
                    .then((latestDate) => {
                      if(latestDate === null){
                        latestDate = dates.createLastWeek();
                      }
                        let filteredPostLinkPromises = postLinkPromiseArray.filter((link, index) => {
                            const latestDBDate = latestDate;
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
                        console.log("Final Array Length: " + finalArray.length);
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
                        const descriptionArray = htmlArray.map((innerHTML, index) => {
                            return Scrape.getWWInnerDescription(innerHTML, index);
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
                            console.log("Final Array Length: " + eventArray.length);
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
            return accessDB.getDateScrapeData()
                .then((scrapeDates) => {
                    let ddScrapeDate = dates.createYesterday();
                    let wwScrapeDate = dates.createYesterday();
                    let meetupScrapeDate = dates.createYesterday();

                    if (scrapeDates.length > 0) {
                        ddScrapeDate = scrapeDates[0].latest_date;
                        wwScrapeDate = scrapeDates[1].latest_date;
                        meetupScrapeDate = scrapeDates[2].latest_date;
                    }

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
            return accessDB.updateDateScraped(updateBody, source)
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

        console.log("Getting Meetup API");
        return Scrape.getRequest(fullURL)
            .then((meetupRawEventArray) => {
                console.log("Filtering only public events");
                const onlyPublicEventsArray = meetupRawEventArray.filter((event) => {
                    return (event.visibility === "public");
                })
                return Promise.all(onlyPublicEventsArray);
            })
            .then((onlyPublicEventsArray) => {
              console.log("Getting existing events from DB");
                globalCleanedEventArray = onlyPublicEventsArray;
                return accessDB.getDBMeetupEvents()
            })
            .then((dbMeetupEventsArray) => {
              console.log("Filtering out duplicates");
                const cleanedEventArray = globalCleanedEventArray.filter((event, index) => {
                    const thisScrapeID = event.id;

                    const shouldInclude = dbMeetupEventsArray.every((dbEvent) => {
                        const dbScrapeID = dbEvent.scrape_id;
                        const check = (thisScrapeID !== dbScrapeID)
                        return check;
                    })
                    return shouldInclude;
                })
                return Promise.all(cleanedEventArray);
            })
            .then((cleanedEventArray) => {
              console.log("Getting event links");
                globalCleanedEventArray = cleanedEventArray;
                const eventLinkArray = cleanedEventArray.map((event) => {
                    return event.link;
                })
                return Promise.all(eventLinkArray);
            })
            .then((eventLinkArray) => {
              console.log("Scraping individual events");
                const htmlArray = eventLinkArray.map((link) => {
                    return Scrape.getHTML(link);
                })
                return Promise.all(htmlArray);
            })
            .then((htmlArray) => {
              console.log("Getting additional event detail data");
                const dateTimeArray = htmlArray.map((html) => {
                    return Scrape.getMeetupDateTimeImageCategory(html);
                })
                return Promise.all(dateTimeArray);
            })
            .then((dateTimeArray) => {
              console.log("Creating final array");
                const finalEventArray = globalCleanedEventArray.map((event, index) => {
                    const cleanReturnEvent = {};
                    cleanReturnEvent.eventName = event.name;
                    cleanReturnEvent.scrapeID = event.id;
                    cleanReturnEvent.sourceName = source;
                    cleanReturnEvent.eventLink = event.link;
                    cleanReturnEvent.description = event.description;
                    if (event.venue) {
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
              console.log("Packaging final array into an Object");
                let returnArrayObject = {};
                if (finalEventArray.length === 0) {
                    finalEventArray = null;
                }
                returnArrayObject.eventArray = finalEventArray;
                console.log("Final Array Length: " + finalEventArray.length);
                return returnArrayObject;
            })



    }


}
