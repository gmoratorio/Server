exports.up = function(knex, Promise) {
  return knex.schema.createTable('event', function(table){
    table.increments();
    table.string('link');
    table.string('description');
    table.string('date');
    table.float('price');
    table.string('time');
    table.string('Eventname').notNullable();

});
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('event');
};
