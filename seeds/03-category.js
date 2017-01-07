


exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex.raw('DELETE FROM "category"; ALTER SEQUENCE category_id_seq RESTART WITH 14')
        .then(function() {
            const categories = [{
                id: 1,
                name: 'Art'
            }, {
                id: 2,
                name: 'Business & Technology',
            }, {
                id: 3,
                name: 'Craft Beer'
            }, {
                id: 4,
                name: 'Dear Denver'
            }, {
                id: 5,
                name: 'Family'
            }, {
                id: 6,
                name: 'Gaming'
            }, {
                id: 7,
                name: 'Meetup'
            }, {
                id: 8,
                name: 'Miscellaneous'
            }, {
                id: 9,
                name: 'Music'
            }, {
                id: 10,
                name: 'Outdoors'
            }, {
                id: 11,
                name: 'Social'
            }, {
                id: 12,
                name: 'Sports'
            }, {
                id: 13,
                name: 'WestWord'
            }];
            return knex('category').insert(categories);
        });

};
