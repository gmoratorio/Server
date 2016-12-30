const express = require('express');
const router = express.Router();
const knex = require('../db/connection');
/* GET home page. */
router.get('/', (req, res, next) => {
    return knex('user')
    .select()
    .then(data => {
        res.render('new_member', {data: data});
    });
});
router.post('/new_member', function(req, res, next) {
    knex('user').insert({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    }).returning('id').then(function(id) {
        res.redirect('/');
    });
});
module.exports = router;
