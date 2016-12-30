exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex.raw('DELETE FROM "user"; ALTER SEQUENCE user_id_seq RESTART WITH 1')
        .then(function() {
            const users = [
            {
                name: 'Jeremy'
            }, {
                name: 'Guillermo'
            },
            {
                name: 'Mark'
            },
            {
                name: 'Matt'
            }];
          return knex('user').insert(users);
        });

};
