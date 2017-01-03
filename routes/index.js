const express = require('express');
const router = express.Router();
const knex = require('../db/connection');

router.get('/', (req, res) => {
    return knex('user')
        .select()
        .then(data => {
            console.log(data);
            res.json(data);
        });
});

module.exports = router;
