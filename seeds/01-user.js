exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex.raw('DELETE FROM "user"; ALTER SEQUENCE user_id_seq RESTART WITH 1')
        .then(function() {
            const users = [
            {
                firstName: 'Jeremy',
                lastName: 'Clayton',
                email: 'doodoo1@gmail.com',
                password: 'thizz'
            }, {
                firstName: 'Guillermo',
                lastName: 'Mortatorio',
                email: 'doodoo2@gmail.com',
                password: 'thizz'
            },
            {
                firstName: 'Mark',
                lastName: 'Grant',
                email: 'doodoo3@gmail.com',
                password: 'thizz'
            },
            {
                firstName: 'Matt',
                lastName: 'Seaton',
                email: 'doodoo4@gmail.com',
                password: 'thizz'
            }];
          return knex('user').insert(users);
        });

};
