
exports.up = function(knex) {
    return knex.schema.createTable("paintings", function(table) {
        table.string("painting_id").primary().notNullable();
        
        table.string("user_id").notNullable();
        table.foreign("user_id").references("user_id").inTable("users").onDelete("cascade");

        table.string("title").notNullable();
        table.string("description").notNullable();
        table.string("objective").notNullable();
        table.string("src").notNullable();
        table.string("category").notNullable();
        table.float("count").notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable("paintings");
};
