exports.up = function(knex, Promise) {
  return knex.schema.createTable('event', function(table){
    table.increments();
    table.string('link');
    table.string('description');
    table.datetime('date').notNullable();
    table.float('price');
    table.float('time');
    table.string('Eventname').notNullable();

});
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('event');
};
