const CommentsModel = require("../models/CommentsModel");


module.exports = {
    async create(request, response){
        try{
            const NewComment = request.body;
            const result = await CommentsModel.create(NewComment);

            return response.status(200).json({comments_id: result});
        } catch (err) {
            console.warn("Comments creation failed: " + err);
            return response.status(500).json({
                notification: "Internal server error while trying to create Comments",
            });    
        }
    },

    async getById(request, response){
        try {
            const { comments_id } = request.params;
            const result = await CommentsModel.getById(comments_id);
            console.log("Saiu isso aqui: " + result);

            return response.status(200).json(result);
        } catch (err) {
            console.warn("Comments getById failed: " + err);
            return response.status(500).json({
                notification: "Internal server error while trying to create Comments",
            });    
        }
    },

    async getByPaintingId(request, response){
        try {
            const { painting_id } = request.params;
            const result = await CommentsModel.getByPaintingId(painting_id);

            return response.status(200).json(result);
        } catch (err) {
            console.warn("Painting getByPaintingId failed: " + err);
            return response.status(500).json({
                notification: "Internal server error while trying to getByPaintingId Painting",
            });
        }
    },

    async index(request, response){
        const comment = await CommentsModel.index();
        return response.json(comment);
    },

    async update(request, response){
        try {
            const { comments_id } = request.params;
            const NewComment = request.body;

            await CommentsModel.updateById(comments_id, NewComment);

            return response.status(200).json({ notification: "Comment update sucesfully" });
        } catch (err) {
            console.warn("Comments update failed: " + err);
            return response.status(500).json({
                notification: "Internal server error while trying to update Comments",
            });    
        }
    },

    async delete(request, response){
        try {
            const { comments_id } = request.params;
            const result = await CommentsModel.deleteById(comments_id);

            if (result === 0)
                return response.status(400).json({ notification: "comments_id not found"});

            return response.status(200).json({ notification: "Comment deleted sucesfully" });
        } catch (err) {
            console.warn("Comments delete failed: " + err);
            return response.status(500).json({
                notification: "Internal server error while trying to delete Comments",
            });            
        }
    }
}