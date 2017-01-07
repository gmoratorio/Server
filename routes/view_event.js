'use strict'


const express = require('express');
const router = express.Router();
const knex = require('../db/connection');

router.get('/:id', (req, res) => {
    return knex('event')
        .where('id', req.params.id)
        .then(data => {
            res.render('view_event', {
                data: data
            });
        });
});

module.exports = router;
