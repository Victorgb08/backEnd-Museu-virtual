const { v4: uuidv4 } = require('uuid');
const connection = require("../database/connections");

module.exports = {
    async create(comment) {
        const comments_id = uuidv4();
        comment.comments_id = comments_id;

        await connection("comments").insert(comment);
        return comments_id;
    },

    async getById(comments_id){
        const result = await connection("comments")
            .where({ comments_id })
            .select("*");
        return result;
    },

    async index(){
        const result = await connection("comments").select("*");
        return result;
    },

    async getByPaintingId(painting_id){
        const result = await connection("comments")
            .where({ painting_id })
            .select("*");

        return result;
    },

    async updateById(comments_id, comment){
        const result = await connection("comments").where({ comments_id }).update(comment);
        return result;
    },

    async deleteById(comments_id){
        const result = await connection("comments").where({ comments_id }).delete();
        return result;
    },
}