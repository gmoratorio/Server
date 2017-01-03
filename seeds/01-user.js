exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex.raw('DELETE FROM "user"; ALTER SEQUENCE user_id_seq RESTART WITH 1')
        .then(function() {
            const users = [
            {
                firstName: 'Jeremy',
                lastName: 'Clayton'
            }, {
                firstName: 'Guillermo',
                lastName: 'Mortatorio'
            },
            {
                firstName: 'Mark',
                lastName: 'Grant'
            },
            {
                firstName: 'Matt',
                lastName: 'Seaton'
            }];
          return knex('user').insert(users);
        });

};
