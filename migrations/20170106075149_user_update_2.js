


exports.up = function(knex, Promise) {
  return knex.schema.alterTable('user', function(table) {
    table.string('google_id');
    table.string('photo');
    table.string('token');
});
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('user', function(table) {
      table.dropColumns('google_id', 'photo', 'token');
  });
};
