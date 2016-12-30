exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex.raw('DELETE FROM "user"; ALTER SEQUENCE user_id_seq RESTART WITH 5')
        .then(function() {
            const userAndEvent = [{
                event_id: 3,
                user_id: 1
            },
            {
                event_id: 1,
                user_id: 5
            },
            {
                event_id: 3,
                event_id: 6
            },
            
                user_id: 2,
                event_id: 9
            },
            {
                user_id: 1,
                event_id: 3
            }];
          return knex('user_event').insert(userAndEvent);
        });

};
