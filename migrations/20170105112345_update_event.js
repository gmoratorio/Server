
exports.up = function(knex, Promise) {

  return knex.schema.alterTable('event', function(table) {
    table.string('scrape_id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('event', function(table) {
    table.dropColumn('scrape_id');
  });

};
