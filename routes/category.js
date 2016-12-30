const express = require('express');
const router = express.Router();
const knex = require('../db/connection');

router.get('/', (req, res, next) => {
    return knex('category')
        .select()
        .then(data => {
            res.render('category', {
                data: data
            });
        });
});
module.exports = router;
