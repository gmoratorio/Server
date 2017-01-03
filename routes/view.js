const express = require('express');
const router = express.Router();
const knex = require('../db/connection');

// router.get('/:id', (req, res) => {
//     return knex('user')
//         .where('id', req.params.id)
//         .then(data => {
//             res.render('view', {
//                 data: data
//             });
//         });
// });
router.get('/:id', (req, res) => {
    return knex('user.firstName', 'user.lastName', 'category.name').from('category').join('user_category', 'category.id', 'user_category.category_id')
        .join('user', 'user.id', 'user_category.user_id')
        .where('user.id', req.params.id)
        .then(data => {
            res.json(data);
            });
        });
});
module.exports = router;
