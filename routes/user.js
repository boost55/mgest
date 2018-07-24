'use strict'

var express = require('express');
var UserContoller = require('../controllers/user');

var api = express.Router();
var md_auth = require('../middlewares/authenticated'); 
var md_admin = require('../middlewares/is_admin'); 


api.get('/pruebas-del-controlador', md_auth.ensureAuth, UserContoller.pruebas);
api.post('/user',[md_auth.ensureAuth, md_admin.isAdmin], UserContoller.saveUser);
api.post('/login', UserContoller.login);
api.delete('/user/:id', [md_auth.ensureAuth, md_admin.isAdmin], UserContoller.deleteUser);
api.get('/users', [md_auth.ensureAuth, md_admin.isAdmin],UserContoller.getListaUser);
api.get('/user/:id',[md_auth.ensureAuth, md_admin.isAdmin],UserContoller.getUser);


module.exports = api;