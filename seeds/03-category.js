
exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex.raw('DELETE FROM "category"; ALTER SEQUENCE category_id_seq RESTART WITH 1')
        .then(function() {
            const categories = [{
                name: 'Social'
            }, {
                name: 'Sports',
            },
            {
                name: 'MusicArt'
            },
            {
                name: 'BizTech'
            },
            {
                name: 'Gaming'
            },
            {
                name: 'Family'
            },
            {
                name: 'Misc'
            }];
          return knex('category').insert(categories);
        });

};
