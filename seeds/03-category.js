exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex.raw('DELETE FROM "category"; ALTER SEQUENCE category_id_seq RESTART WITH 1')
        .then(function() {
            const categories = [{
                name: 'Sports'
            }, {
                name: 'Art',
            },
            {
                name: 'Social'
            },
            {
                name: 'Comedy'
            },
            {
                name: 'Music'
            },
            {
                name: 'Family'
            },
            {
                name: 'Tech'
            },
            {
                name: 'Food'
            },
            {
                name: 'Drink'
            }];
          return knex('category').insert(categories);
        });

};
