const connection = require("../database/connection");

//o module.exports nada mais é que falar q nesse arquivo vamos exportar um objeto e dentro dele há varias funções
module.exports = {
    async create() {
        const result = await connection("categoria").insert(categoria);
        return result;
    },

    async getById({ categoria_id, user_id }){
        const result = await connection("categoria")
            .where({categoria_id, user_id})
            .select("*");
        return result;
    },

    async updateById(categoria_id, categoria){
        const result = await connection("categoria").where(categoria_id).update(categoria);
        return result;
    },

    async deleteById(categoria_id) {
        const result = await connection("categoria").where({ categoria_id }).delete();
        return result;
    }

}

