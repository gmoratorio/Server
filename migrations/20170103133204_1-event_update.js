
exports.up = function(knex, Promise) {
  return knex.schema.alterTable('event', function(table) {
    table.decimal('price');
    table.string('imageLink');
    table.string('location');
    table.string('address');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('event', function(table) {
    table.dropColumns('price', 'imageLink', 'location', 'address');
  });
};
