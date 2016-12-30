exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex.raw('DELETE FROM "user"; ALTER SEQUENCE user_id_seq RESTART WITH 6')
        .then(function() {
            const eventAndCategory = [{
                category_id: 3,
                event_id: 1
            },
            {
                category_id: 1,
                event_id: 5
            },
            {
                category_id: 3,
                event_id: 6
            },
            {
                category_id: 4,
                event_id: 8
            },
            {
                category_id: 2,
                event_id: 9
            },
            {
                category_id: 1,
                event_id: 3
            }];
          return knex('event_category').insert(eventAndCategory);
        });

};
