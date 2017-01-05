exports.up = function(knex, Promise) {
  return knex.schema.createTable('date_scrape', function(table){
    table.increments();
    table.text('name').notNullable();
    table.date('latest_date').notNullable();
});
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('date_scrape');
};
