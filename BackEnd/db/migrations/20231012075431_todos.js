// migrations/20231018123457_add_cascade_to_todo_items.js

exports.up = function (knex) {
  return knex.schema.alterTable('todo_items', function (table) {
    table
      .integer('todo_id')
      .unsigned()
      .references('id')
      .inTable('todos')
      .onDelete('CASCADE');
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable('todo_items', function (table) {
    table.dropForeign('todo_id');
  });
};
