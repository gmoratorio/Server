var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
    return knex('event')
        .select()
        .then(data => {
            res.render('event', {
                data: data
            });
        });
});

module.exports = router;
