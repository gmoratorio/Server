
exports.up = function(knex, Promise) {
  return knex.schema.alterTable('event', function(table) {
    table.decimal('price');
    table.string('image');
    table.string('location');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('event', function(table) {
    table.dropColumns('price', 'image', 'location');
  });
};
