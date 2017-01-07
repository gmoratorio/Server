


exports.up = function(knex, Promise) {
  return knex.schema.createTable("user", function(table){
    table.increments();
    table.string('first_name').notNullable();
    table.string('last_name').notNullable();
    table.datetime('DOB');
});
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("user");
};
