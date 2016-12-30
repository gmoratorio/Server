exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex.raw('DELETE FROM "user"; ALTER SEQUENCE user_id_seq RESTART WITH 5')
        .then(function() {
            const users = [{
                id: 1,
                name: 'Jeremy'
            }, {
                id: 2,
                name: 'Guillermo',
            },
            {
                id: 3,
                name: 'Mark'
            },
            {
                id: 4,
                name: 'Matt'
            }];
          return knex('user').insert(users);
        });

};
