
exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex.raw('DELETE FROM "category"; ALTER SEQUENCE category_id_seq RESTART WITH 8')
        .then(function() {
            const categories = [{
                id: 1,
                name: 'Social'
            },
            {
                id: 2,
                name: 'Sports'
            },
            {
                id: 3,
                name: 'MusicArt'
            },
            {
                id: 4,
                name: 'BizTech'
            },
            {
                id: 5,
                name: 'Gaming'
            },
            {
                id: 6,
                name: 'Family'
            },
            {
                id: 7,
                name: 'Misc'
            }];
          return knex('category').insert(categories);
        });

};
