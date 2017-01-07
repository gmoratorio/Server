'use strict'


exports.up = function(knex, Promise) {
  return knex.schema.alterTable('event', function(table) {
    table.string('price');
    table.string('image_link');
    table.string('location');
    table.string('address');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('event', function(table) {
    table.dropColumns('price', 'image_link', 'location', 'address');
  });
};
