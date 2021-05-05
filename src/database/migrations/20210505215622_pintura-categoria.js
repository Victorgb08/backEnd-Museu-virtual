
exports.up = function(knex) {
    return knex.schema.createTable("pintura-categoria", function (table) {
        table.string('pintura_id').notNullable();
        table
            .foreign("pintura_id")
            .references("pintura_id")
            .inTable("pintura")
            .onDelete("cascade");
        table.integer("categoria_id").notNullable();
        table
            .foreign("categoria_id")
            .references("categoria_id")
            .inTable("categoria")
            .onDelete("cascade");
    })
  };
  
  exports.down = function(knex) {
      return knex.schema.dropTable("pintura-categoria");
  };
  