const Firebase = require("../utils/Firebase");
const UsersModel = require("../models/UsersModel");
const jwt = require("jsonwebtoken");

module.exports = {
    async signIn(request, response) {
        try{
            //Vamos receber pelo body um usuario e uma senha
            const { email, password }= request.body;

            let firebaseId;
            try {
                firebaseId = await Firebase.login(email, password);
            } catch(error) {
                console.warn(error);
                return response.status(403).json({ notification: "Invalid Credentials"})
            }
            
            const user = await UsersModel.getByFields({ firebase_Id: firebaseId });

            const acessToken = jwt.sign({user}, process.env.ACESS_TOKEN_SECRET, { expiresIn: "30d", });

            return response.status(200).json({ user, acessToken });

        } catch (error) {
            console.log("User creation failed: " + error);
            return response.status(500).json({
                Notification: "Internal server error while trying to create User",
            });
        }
    },
}