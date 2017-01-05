exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex.raw('DELETE FROM "date_scrape"; ALTER SEQUENCE user_id_seq RESTART WITH 3')
        .then(function() {
            const dates = [
            {
                id: 1,
                name: 'Dear Dever',
                latestDate: '2017-12-2T07:00:00.000Z'
            }, {
                id: 2,
                name: 'WestWord',
                latestDate: '2017-12-2T07:00:00.000Z'
            }];
          return knex('date_scrape').insert(dates);
        });

};
