const express = require('express');

const UserController = require('./controllers/UserController');
const PinturaController = require('./controllers/PinturaController');
const ProfileController = require('./controllers/ProfileController');
const LoginController = require('./controllers/LoginController');
const CommentsController = require('./controllers/CommentsController');

const routes = express.Router();

routes.post('/sessions', LoginController.create);

//vamos listar todas os users do banco de dados
routes.get('/user', UserController.index);
routes.post('/user', UserController.create);

routes.get('/profile', ProfileController.index);

routes.get('/pinturas', PinturaController.index);
routes.post('/pinturas', PinturaController.create);
routes.delete('/pinturas/:id', PinturaController.delete);

routes.get('/comentarios', CommentsController.index);
routes.post('/comentarios', CommentsController.create);
routes.delete('/comentarios/:id', CommentsController.delete);

module.exports = routes;