
exports.up = function(knex, Promise) {
  return knex.schema.createTable("user", function(table){
    table.increments();
    table.string('firstName').notNullable();
    table.string('lastName').notNullable();
    table.datetime('DOB');
});
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("user");
};
