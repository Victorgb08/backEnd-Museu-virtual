
exports.up = function(knex) {
    return knex.schema.createTable("categoria", function (table) {
        table.increments('categoria_id').primary().notNullable();
        table.string('user_id').notNullable();
        table.foreign("user_id").references("user_id").inTable("user").onDelete("cascade");
        table.string('nome').notNullable();
    })
  };
  
  exports.down = function(knex) {
      return knex.schema.dropTable("categoria");
  };
  