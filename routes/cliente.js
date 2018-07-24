'use strict'

var express = require('express');
var ClienteContoller = require('../controllers/cliente');

var api = express.Router();
var md_auth = require('../middlewares/authenticated'); 
var md_admin = require('../middlewares/is_admin'); 

var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './uploads/cliente' });

api.get('/pruebas-cliente', md_auth.ensureAuth, ClienteContoller.pruebas);
api.post('/cliente', md_auth.ensureAuth, ClienteContoller.saveCliente);
api.get('/clientes', ClienteContoller.getClientes);
api.get('/cliente/:id',ClienteContoller.getCliente);
api.delete('/cliente/:id', [md_auth.ensureAuth, md_admin.isAdmin], ClienteContoller.deleteCliente);

api.post('/upload-image-cliente/:id', [md_auth.ensureAuth, md_upload ], ClienteContoller.uploadImage);
//api.get('/get-image-cliente/:imageFile', ClienteContoller.getImageFile);
//api.post('/upload-image-cliente/:id', [md_auth.ensureAuth, md_admin.isAdmin, md_upload ], ClienteContoller.saveImagen);
module.exports = api;