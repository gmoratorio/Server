const scrape = require("../routes/scrape");
const knex = require('../db/connection');

module.exports = {

    postToDB: function postToDB(eventArray) {
        const inserts = eventArray.map((event) => {
            return knex('event').insert({
                sourceName: event.sourceName,
                eventLink: event.eventLink,
                description: event.description,
                date: event.date,
                time: event.time,
                eventName: event.eventName
                // categories: event.categories
            });
        });
        return Promise.all(inserts)
            .then(() => {
                return {
                    message: 'success'
                };
            });

    }

}
