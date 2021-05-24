const { response } = require('express');
const { v4: uuidv4 } = require('uuid');
const connection = require("../database/connections");

module.exports = {
    async create(user) {
        const user_id = uuidv4();
        user.user_id = user_id;

        await connection("users").insert(user);
        return user_id;
    },

    async index(){
        const result = await connection("users").select("*");
        return result;
    },

    async getByFields(fields) {
        const result = await connection("users")
            .where(fields)
            .select("*")
            .first();
        return result;
    },

    async getById(user_id){
        const result = await connection("users")
            .where({ user_id })
            .select("*")
            .first();
        return result;
    },

    async updateById(user_id, user){
        const result = await connection("users").where({ user_id }).update(user);
        return result;
    },

    async deleteById(user_id){
        const result = await connection("users").where({ user_id }).delete();
        return result;
    },
}