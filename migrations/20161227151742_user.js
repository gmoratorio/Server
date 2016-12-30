
exports.up = function(knex, Promise) {
  return knex.schema.createTable('user', function(table){
    table.increments();
    table.string('name').notNullable();
    table.datetime('DOB').notNullable();
});
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('user');
};
