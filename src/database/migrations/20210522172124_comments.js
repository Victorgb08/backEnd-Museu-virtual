
exports.up = function(knex) {
    return knex.schema.createTable("comments", function(table) {
        table.string("comments_id").primary().notNullable();
        
        table.string("painting_id").notNullable();
        table.foreign("painting_id").references("painting_id").inTable("paintings").onDelete("cascade");

        table.string("comment").notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable("comments");
};
