const { v4: uuidv4 } = require('uuid');
const connection = require("../database/connections");

module.exports = {
    async create(painting) {
        const painting_id = uuidv4();
        painting.painting_id = painting_id;

        await connection("paintings").insert(painting);
        return painting_id;
    },

    async getById(painting_id){
        const result = await connection("paintings")
            .where({ painting_id })
            .select("*")
            .first();
        return result;
    },

    async index(){
        const result = await connection("paintings").select("*");
        return result;
    },

    async getByUserId(user_id){
        const result = await connection("paintings")
            .where({ user_id })
            .select("*");

        return result;
    },

    async updateById(painting_id, painting){
        const result = await connection("paintings").where({ painting_id }).update(painting);
        return result;
    },

    async deleteById(painting_id){
        const result = await connection("paintings").where({ painting_id }).delete();
        return result;
    },
}