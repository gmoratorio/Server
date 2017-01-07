'use strict'


exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex.raw('DELETE FROM "date_scrape"; ALTER SEQUENCE date_scrape_id_seq RESTART WITH 3')
        .then(function() {
            const dates = [
            {
                id: 1,
                name: 'Dear Denver',
                latest_date: '2017-01-02T07:00:00.000Z'
            }, {
                id: 2,
                name: 'WestWord',
                latest_date: '2017-01-02T07:00:00.000Z'
            }, {
                id: 3,
                name: 'Meetup',
                latest_date: '2017-01-03T07:00:00.000Z'
            }];
          return knex('date_scrape').insert(dates);
        });

};
