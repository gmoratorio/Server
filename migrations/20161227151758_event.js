exports.up = function(knex, Promise) {
  return knex.schema.createTable('event', function(table){
    table.increments()
    table.string('source_name');
    table.string('event_link');
    table.text('description');
    table.string('date');
    table.string('time');
    table.string('event_name').notNullable();

});
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('event');
};
