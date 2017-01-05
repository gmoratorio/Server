
exports.up = function(knex, Promise) {
  return knex.schema.alterTable('event', function(table) {
    table.decimal('price');
    table.string('image_link');
    table.string('location');
    table.string('address');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('event', function(table) {
    table.dropColumns('price', 'image-link', 'location', 'address');
  });
};
