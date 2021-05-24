const UsersModel = require("../models/UsersModel");
const Firebase = require("../utils/Firebase");

module.exports = {
    async create(request, response){
        try{
            const user = request.body;

            const uid = await Firebase.createNewUser(user.email, user.password);


            user.firebase_id = uid;

            const result = await UsersModel.create(user);
            return response.status(200).json({ user_id: result });
        } catch (err) {
            console.log("User creation failed: " + err);
            return response.status(500).json({
                Notification: "Internal server error while trying to create User",
            });
        }
    },

    async getById(request, response){
        try {
            const { user_id } = request.params;
            const result = await UsersModel.getById(user_id);

            return response.status(200).json(result);
        } catch (err) {
            console.log("User getBId failed: " + err);
            return response.status(500).json({
                Notification : "Internal server error while trying to get User",
            });
        }
    },

    async index(request, response){
        const user = await UsersModel.index();
        return response.json(user);
    },

    async update(request, response){
        try {
            const { user_id } = request.params;
            const user = request.body;
            
            await UsersModel.updateById(user_id, user);

            return response.status(200).json({ notification: "User update sucesfully" });
        } catch (err) {
            console.log("User update failed: " + err);
            return response.status(500).json({
                Notification : "Internal server error while trying to update User",
            });
        }
    },

    async delete(request, response){
        try {
            const { user_id } = request.params;
            const result = await UsersModel.deleteById(user_id);

            if (result === 0) 
                return response.status(400).json({ notification: "user_id not found"});

            return response.status(200).json({ notification: "User deleted sucesfully" });
        } catch (err) {
            console.log("User delete failed: " + err);
            return response.status(500).json({
                Notification : "Internal server error while trying to get User",
            });
        }
    }
}