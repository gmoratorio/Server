'use strict'


const express = require('express');
const router = express.Router();
const knex = require('../db/connection');
// var knex = require('../db/categoriesEvents');

router.get('/:id', (req, res) => {
    return knex('*', 'category.name').from('event').join('event_category', 'event.id', 'event_category.event_id')
    .join('category', 'category.id', 'event_category.category_id')
    .where('category.id', req.params.id)
        .then(data => {
            res.json(data);
            // res.render('view_categoriesEvents', {
            //     data: data
            // });
        });
});
// SQL function for above knex function
// select *
// from event
// inner join event_category
//  on event.id = event_category.event_id
// inner join category
// on category.id = event_category.category_id
// and category.id = 1;



module.exports = router;
