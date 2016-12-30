
exports.up = function(knex, Promise) {
  return knex.schema.createTable('user_event', function(table){
    table.increments();
    table.integer('event_id').unsigned();
    table.foreign('event_id').references('event.id');
    table.integer('user_id').unsigned();
    table.foreign('user_id').references('user.id');
});
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('user_event');
};
