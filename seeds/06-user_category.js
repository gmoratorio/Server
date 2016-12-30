exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex.raw('DELETE FROM "user_category"; ALTER SEQUENCE user_category_id_seq RESTART WITH 1')
        .then(function() {
            const userAndCategory = [{
                user_id: 1,
                category_id: 4
            },
            {
                user_id: 1,
                category_id: 3
            },
            {
                user_id: 2,
                category_id: 1
            },
            {
                user_id: 2,
                category_id: 3
            },
            {
                user_id: 3,
                category_id: 7
            },
            {
                user_id: 3,
                category_id: 6
            },
            {
                user_id: 4,
                category_id: 2
            },
            {
                user_id: 4,
                category_id: 8
            },
            ];
          return knex('user_category').insert(userAndCategory);
        });

};
