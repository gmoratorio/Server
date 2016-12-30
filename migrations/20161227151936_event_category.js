
exports.up = function(knex, Promise) {
  return knex.schema.createTable('event_category', function(table){
    table.increments();
    table.integer('category_id').unsigned();
    table.foreign('category_id').references('category.id');
    table.integer('event_id').unsigned();
    table.foreign('event_id').references('event.id');
});
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('event_category');
};
