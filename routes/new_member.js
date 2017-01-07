'use strict'


const express = require('express');
const router = express.Router();
const knex = require('../db/connection');


router.get('/', function(req, res, next) {
    res.render('new_member');
});

router.post('/new_member', function(req, res, next) {
    knex('user').insert({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    }).returning('id').then(function(id) {
        res.redirect('/' + id);
    });
});
module.exports = router;
