exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex.raw('DELETE FROM "user"; ALTER SEQUENCE user_id_seq RESTART WITH 5')
        .then(function() {
            const users = [
            {
                id: 1,
                first_name: 'Jeremy',
                last_name: 'Clayton',
                email: 'doodoo1@gmail.com',
                password: 'thizz'
            }, {
                id: 2,
                first_name: 'Guillermo',
                last_name: 'Mortatorio',
                email: 'doodoo2@gmail.com',
                password: 'thizz'
            },
            {
                id: 3,
                first_name: 'Mark',
                last_name: 'Grant',
                email: 'doodoo3@gmail.com',
                password: 'thizz'
            },
            {
                id: 4,
                first_name: 'Matt',
                last_name: 'Seaton',
                email: 'doodoo4@gmail.com',
                password: 'thizz'
            }];
          return knex('user').insert(users);
        });

};
