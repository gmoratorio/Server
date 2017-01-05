const scrape = require("../routes/scrape");
const knex = require('../db/connection');

module.exports = {

    postToDB: function postToDB(eventArray) {
        const inserts = eventArray.map((event) => {
            return knex('event').insert({
                source_name: event.sourceName,
                event_link: event.eventLink,
                description: event.description,
                date: event.date,
                time: event.time,
                event_name: event.eventName
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
