const knex = require('../db/connection');


module.exports = {

    getRawCompleteEventInfo: function getRawCompleteEventInfo() {
        return knex('event')
            .innerJoin('event_category', 'event.id', 'event_category.event_id')
            .innerJoin('category', 'event_category.category_id', 'category.id')
            .select('event.id', 'source_name', 'event_name', 'event_link', 'image_link', 'date', 'time', 'price', 'location', 'address', 'description')
            .select('category.name as category')
            .orderBy('event.id', 'asc')
    },
    getDateScrapeData: function getDateScrapeData() {
        return knex('date_scrape')
            .select()
    },
    updateDateScraped: function updateDateScraped(updateBody, source) {
        return knex('date_scrape')
            .update(updateBody, 'latest_date')
            .where('name', source)
    },
    insertNewEvent: function insertNewEvent(sourceName, eventName, scrapeID, eventLink, description, date, time, price, imageLink, location, address) {
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

    },
    insertNewEventCategory: function insertNewEventCategory(eventID, categoryID) {
        return knex('event_category').insert({
            event_id: eventID,
            category_id: categoryID
        }, 'id');
    },
    getAllEvents: function getAllEvents() {
        return knex('event')
            .select()
    },
    getDBMeetupEvents: function getDBMeetupEvents(){
      return knex('event')
          .select()
          .where('source_name', 'Meetup')
          .orderBy('id', 'asc')
    }
}
