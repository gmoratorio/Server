'use strict'



exports.up = function(knex, Promise) {
  return knex.schema.alterTable("user", function(table) {
    table.string('email');
    table.string('password');
});
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable("user", function(table) {
      table.dropColumns('email', 'password');
  });
};
