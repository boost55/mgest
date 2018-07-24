'use strict'

var express = require('express');
var ListaContoller = require('../controllers/lista');

var api = express.Router();
var md_auth = require('../middlewares/authenticated'); 
var md_admin = require('../middlewares/is_admin'); 

api.post('/lista', [md_auth.ensureAuth, md_admin.isAdmin], ListaContoller.saveLista);
api.get('/lista', ListaContoller.getListas);
api.get('/lista/:id', ListaContoller.getLista);
api.delete('/lista/:id', [md_auth.ensureAuth, md_admin.isAdmin], ListaContoller.deleteLista);
api.get('/list/:id', ListaContoller.getList);
module.exports = api;