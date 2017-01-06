
exports.up = function(knex, Promise) {

  return knex.schema.alterTable('event', function(table) {
    table.string('scrape_id');
<<<<<<< HEAD

=======
>>>>>>> 2797277789a6154e50bffa3a50b28a4a85d8d630
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('event', function(table) {
    table.dropColumn('scrape_id');
  });

};
