exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex.raw('DELETE FROM "category"; ALTER SEQUENCE category_id_seq RESTART WITH 14')
        .then(function() {
            const categories = [{
                id: 1,
                name: 'Social'
            }, {
                id: 2,
                name: 'Sports',
            }, {
                id: 3,
                name: 'Music'
            }, {
                id: 4,
                name: 'Business & Technology'
            }, {
                id: 5,
                name: 'Gaming'
            }, {
                id: 6,
                name: 'Family'
            }, {
                id: 7,
                name: 'Miscellaneous'
            }, {
                id: 8,
                name: 'Dear Denver'
            }, {
                id: 9,
                name: 'WestWord'
            }, {
                id: 10,
                name: 'Meetup'
            }, {
                id: 11,
                name: 'Outdoors'
            }, {
                id: 12,
                name: 'Art'
            }, {
                id: 13,
                name: 'Craft Beer'
            }];
            return knex('category').insert(categories);
        });

};
