const { v4: uuidv4 } = require('uuid');
const connection = require("../database/connection");

//o module.exports nada mais é que falar q nesse arquivo vamos exportar um objeto e dentro dele há varias funções
module.exports = {
    async create() {
        const pintura_id = uuidv4();
        pintura.pintura_id = pintura_id;
        
        const result = await connection("pintura").insert(pintura);
        return result;
    },

    async getById({ pintura_id, user_id }){
        const result = await connection("pintura")
            .where({pintura_id, user_id})
            .select("*");
        return result;
    },

    async updateById(pintura_id, categoria){
        const result = await connection("pintura").where(pintura_id).update(categoria);
        return result;
    },

    async deleteById(pintura_id) {
        const result = await connection("pintura").where({ pintura_id }).delete();
        return result;
    }

}

