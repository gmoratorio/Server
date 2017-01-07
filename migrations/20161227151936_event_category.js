'use strict'



exports.up = function(knex, Promise) {
  return knex.schema.createTable('event_category', function(table){
    table.increments();
    table.integer('category_id').references('category.id').unsigned().onDelete('cascade');
    table.integer('event_id').references('event.id').unsigned().onDelete('cascade');
});
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('event_category');
};
