const express = require('express');
const routes = express.Router();

const auth = require('./middlewares/authentication');

const UsersController = require("./controllers/UsersController");
const UsersValidator = require("./validators/UsersValidator");

const PaintingsController = require("./controllers/PaintingsController");
const PaintingsValidator = require("./validators/PaintingsValidator");

const CommentsController = require("./controllers/CommentsController");
const CommentsValidator = require("./validators/CommentsValidator");

const SessionController = require("./controllers/SessionController");

// 200 deu tudo certo
// 400 not find erro do cliente
// 500 erro de sistema

    // Session (Login)
    routes.post("/login", SessionController.signIn);

    //Users
    routes.post("/users", UsersValidator.create, UsersController.create);
    routes.get("/users", UsersController.index);
    routes.get("/users/:user_id", UsersValidator.getById, UsersController.getById);
    routes.put("/users/:user_id", UsersValidator.update, UsersController.update);
    routes.delete("/users/:user_id", UsersValidator.delete, UsersController.delete);

    //Paintings
    routes.post("/paintings", PaintingsValidator.create, auth.authenticateToken, PaintingsController.create);
    routes.get("/paintings", PaintingsController.index);
    routes.get("/paintings/:user_id", PaintingsValidator.getByUserId, auth.authenticateToken, PaintingsController.getByUserId);
    //Atenção, para pegar uma pintura o caminho é painting, nao tem o 's' no final
    routes.get("/painting/:painting_id", PaintingsValidator.getById, auth.authenticateToken, PaintingsController.getById);
    routes.put("/paintings/:painting_id", PaintingsValidator.update, auth.authenticateToken, PaintingsController.update);
    routes.delete("/paintings/:painting_id", PaintingsValidator.delete, auth.authenticateToken, PaintingsController.delete);

    //Comments
    routes.post("/comments", CommentsValidator.create, CommentsController.create);
    routes.get("/comments", CommentsController.index);
    routes.get("/comments/:painting_id", CommentsController.getByPaintingId);
    //Atenção, para pegar um comentario o caminho é comment, nao tem o 's' no final
    routes.get("/comment/:comments_id", CommentsValidator.getById, CommentsController.getById);
    routes.put("/comments/:comments_id", CommentsValidator.update, CommentsController.update);
    routes.delete("/comments/:comments_id", CommentsValidator.delete, CommentsController.delete);

module.exports = routes;