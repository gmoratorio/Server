var knex = require('./connection');

module.exports = {
    getEventByCategory: function (req, res) {
        return knex.select('*').from('event').join('event_category', 'event.id', 'event_category.event_id')
        .join('category', 'category.id', 'event_category.category_id')
        .where('category.id', req.params.id);
    }
};
