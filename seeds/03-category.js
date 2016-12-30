exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex.raw('DELETE FROM "user"; ALTER SEQUENCE user_id_seq RESTART WITH 9')
        .then(function() {
            const categories = [{
                id: 1,
                name: 'Sports'
            }, {
                id: 2,
                name: 'Art',
            },
            {
                id: 3,
                name: 'Social'
            },
            {
                id: 4,
                name: 'Happy Hour'
            },
            {
                id: 5,
                name: 'Music'
            },
            {
                id: 6,
                name: 'Family'
            },
            {
                id: 7,
                name: 'Tech'
            },
            {
                id: 8,
                name: 'Food'
            }];
          return knex('category').insert(categories);
        });

};
