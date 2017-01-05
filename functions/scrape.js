const Scrape = require('../aggregates/scrape');
const dates = require('../functions/dates');
const validation = require("../db/validation");
const knex = require('../db/connection');



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
                latestDatabaseDate = latestDBDate;
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
                    const today = dates.createToday();
                    const ddDiff = dates.getDifference(ddScrapeDate, today, "hours");
                    const wwDiff = dates.getDifference(wwScrapeDate, today, "hours");
                    const ddCheck = (ddDiff < 23);
                    const wwCheck = (wwDiff < 23);
                    resolve([ddCheck, wwCheck]);
                })
        })
    },
    markTodayChecked: function markTodayChecked(source){
      return new Promise((resolve, reject) => {
        const today = dates.createToday();
        const updateBody = {latest_date: today};
          return knex('date_scrape')
              .update(updateBody, 'latest_date')
              .where('name', source)
              .then((updatedDate) => {
                  resolve(updatedDate);
              })
      })
    }
}
