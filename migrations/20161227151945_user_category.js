
exports.up = function(knex, Promise) {
  return knex.schema.createTable('user_category', function(table){
    table.increments();
    table.integer('category_id').unsigned();
    table.foreign('category_id').references('category.id');
    table.integer('user_id').unsigned();
    table.foreign('user_id').references('user.id');
});
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('user_category');
};
