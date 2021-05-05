const connection = require("../database/connection");

//o module.exports nada mais é que falar q nesse arquivo vamos exportar um objeto e dentro dele há varias funções
module.exports = {
    async create(user) {
        const result = await connection("user").insert(user);
        return result;
    },

    async getById(user_id) {
        const result = await connection("user")
            .where({ user_id })
            .select("*");
        return result;
    },

    async updateById(user_id, user){
        const result = await connection("user").where({ user_id }).update(user);
        return result;
    },

    async deleteById(categoria_id) {
        const result = await connection("user").wher({ user_id }).delete();
        return result;
    }

}

