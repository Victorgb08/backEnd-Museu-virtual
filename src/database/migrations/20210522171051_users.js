
exports.up = function(knex) {
    return knex.schema.createTable("users", function(table) {
        table.string("user_id").primary().notNullable();
        table.string("name").notNullable();
        table.string("address").notNullable();
        table.string("email").notNullable();
        table.string("password").notNullable();
        table.string("question").notNullable();
        table.string("url_perfil").notNullable();
        table.string("firebase_id").notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable("users");
};
