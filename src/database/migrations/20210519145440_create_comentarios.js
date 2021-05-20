exports.up = function(knex) {
    return knex.schema.createTable("comentarios", function (table) {
        table.string("comment_id").primary().notNullable();
        table.string("images_id").notNullable();
        table.foreign("images_id").references("images_id").inTable("pintura").onDelete("cascade");
  
        table.string("comment").notNullable();
    });
  };
  
  exports.down = function(knex) {
  return knex.schema.dropTable("comentarios");
  };
  