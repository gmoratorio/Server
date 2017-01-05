
exports.up = function(knex, Promise) {

  return knex.schema.alterTable('event', function(table) {
    table.integer('scrape_id').references('date_scrape.id').unsigned().onDelete('cascade');

  });
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('event', function(table) {
    table.dropColumn('scrape_id');
  });

};
