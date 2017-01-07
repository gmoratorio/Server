'use strict'



exports.up = function(knex, Promise) {
  return knex.schema.createTable('user_event', function(table){
    table.increments();
    table.integer('user_id').references('user.id').unsigned().onDelete('cascade');
    table.integer('event_id').references('event.id').unsigned().onDelete('cascade');
});
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('user_event');
};
