exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex.raw('DELETE FROM "user"; ALTER SEQUENCE user_id_seq RESTART WITH 5')
        .then(function() {
            const users = [
            {
                id: 1,
                firstName: 'Jeremy',
                lastName: 'Clayton'
            }, {
                id: 2,
                firstName: 'Guillermo',
                lastName: 'Mortatorio'
            },
            {
                id: 3,
                firstName: 'Mark',
                lastName: 'Grant'
            },
            {
                id: 4, 
                firstName: 'Matt',
                lastName: 'Seaton'
            }];
          return knex('user').insert(users);
        });

};
