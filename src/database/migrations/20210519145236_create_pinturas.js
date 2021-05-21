
exports.up = function(knex) {
    return knex.schema.createTable("pintura", function (table) {
        table.string("images_id").primary().notNullable();
        table.string("user_id").notNullable();
        table.foreign("user_id").references("user_id").inTable("user").onDelete("cascade");
  
        table.string("title").notNullable();
        table.string("description").notNullable();
        table.integer("numComments").notNullable();
        table.string("objective").notNullable();
        table.string("url_img").notNullable();
        table.string("category").notNullable();
    });
  };
  
  exports.down = function(knex) {
  return knex.schema.dropTable("pintura");
  };
  