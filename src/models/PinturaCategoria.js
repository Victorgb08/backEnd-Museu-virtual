const connection = require("../database/connection");
const { create, getById } = require("./Categoria");

module.exports = {
    async create(categoria){
        const result = await connection("categoria").insert(categoria);
        return result;
    },

    async getById({ categoria_id, pintura_id }) {
        const result = await connection("categoria")
            .where({ categoria_id, pintura_id })
            .select("*")
            .first();
        return result;
    },
};