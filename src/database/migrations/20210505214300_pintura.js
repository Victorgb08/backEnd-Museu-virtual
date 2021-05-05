
exports.up = function(knex) {
    return knex.schema.createTable("pintura", function (table) {
        table.string('pintura_id').primary().notNullable();
        table.string('user_id').notNullable();
        table.foreign("user_id").references("user_id").inTable("user").onDelete("cascade");
        table.string('titulo').notNullable();
        table.string('descricao').notNullable();
    })
  };
  
  exports.down = function(knex) {
      return knex.schema.dropTable("pintura");
  };
  