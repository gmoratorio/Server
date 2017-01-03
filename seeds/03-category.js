
exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex.raw('DELETE FROM "category"; ALTER SEQUENCE category_id_seq RESTART WITH 10')
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
                name: 'Comedy'
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
            },
            {
                id: 9, 
                name: 'Drink'
            }];
          return knex('category').insert(categories);
        });

};
