const express = require('express');
const router = express.Router();
const knex = require('../db/connection');


router.get('/', (req, res, next) => {
    return knex('event')
        .select()
        .then(data => {
            res.json(data);
        });
});
router.post('/', function(req, res, next) {
    knex('').insert({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    }).returning('id').then(function(id) {
        res.redirect('/' + id);
    });
});
module.exports = router;
