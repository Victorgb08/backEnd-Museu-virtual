
exports.up = function(knex) {
  return knex.schema.createTable("user", function (table) {
      table.string('user_id').primary().notNullable();
      table.string('name').notNullable();
      table.string('email').notNullable();
      table.string('senha').notNullable();
      table.string('endereco').notNullable();
      table.string('pergunta').notNullable();
  })
};

exports.down = function(knex) {
    return knex.schema.dropTable("user");
};
