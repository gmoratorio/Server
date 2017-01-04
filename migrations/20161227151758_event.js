exports.up = function(knex, Promise) {
  return knex.schema.createTable('event', function(table){
    table.increments()
    table.string('link');
    table.string('sourceName');
    table.string('eventLink');
    table.text('description');
    table.string('date');
    table.string('time');
    table.string('eventName').notNullable();

});
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('event');
};
