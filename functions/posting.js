const scrape = require("../routes/scrape");
// const request = require("request");
// const http = require("http");
// http.post = require("http-post");
const knex = require('../db/connection');
const mapCategory = require("./mapCategory");

module.exports = {

    postToDB: function postToDB(eventArray) {

        const inserts = eventArray.map(function(event) {
            const sourceName = event.sourceName;
            const eventName = event.eventName;

            let eventLink = null;
            if (event.eventLink) {
                eventLink = event.eventLink;
            }

            let description = null;
            if (event.description) {
                description = event.description;
            }

            let date = null;
            if (event.date) {
                date = event.date;
            }

            let time = null;
            if (event.time) {
                time = event.time;
            }

            let price = null;
            if (event.price) {
                price = event.price;
            }

            let imageLink = null;
            if (event.imageLink) {
                imageLink = event.imageLink;
            }

            let location = null;
            if (event.location) {
                location = event.location;
            }

            let address = null;
            if (event.address) {
                address = event.address;
            }

            let scrapeID = null;
            if (event.scrapeID) {
                scrapeID = event.scrapeID;
            }

            return knex('event').insert({
                source_name: sourceName,
                event_name: eventName,
                scrape_id: scrapeID,
                event_link: eventLink,
                description: description,
                date: date,
                time: time,
                price: price,
                image_link: imageLink,
                location: location,
                address: address

            }, 'id');
        });
        return Promise.all(inserts)
            .then((inserts) => {
                const eventCategoryInserts = inserts.map((id, index) => {
                    const thisEvent = eventArray[index];
                    const categories = thisEvent.categories;
                    if (thisEvent.sourceName === "Meetup") {
                        const keys = Object.keys(thisEvent);
                        // console.log(thisEvent.eventName);
                        // console.log(keys);
                        // console.log(categories);
                    }
                    const eventID = id[0];
                    let cleanCategoryIDArray = [];
                    categories.forEach((category) => {

                        const numericID = mapCategory.translate(category);
                        if (cleanCategoryIDArray.length === 0) {
                            cleanCategoryIDArray.push(numericID);
                        } else {
                            const unique = cleanCategoryIDArray.every((id, index) => {
                              return (id !== numericID);
                            })
                            if (unique) {
                                cleanCategoryIDArray.push(numericID);
                            }
                        }
                    });



                    const categoryIDInserts = cleanCategoryIDArray.map((categoryID) => {
                        return knex('event_category').insert({
                            event_id: eventID,
                            category_id: categoryID
                        }, 'id');
                    });
                    return Promise.all(categoryIDInserts);
                })
                return Promise.all(eventCategoryInserts)
            })
            .then((eventCategoryInserts) => {
                // console.log(eventCategoryInserts);
                return {
                    message: 'success'
                };
            });

    }

}
