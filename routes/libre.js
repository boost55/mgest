'use strict'

var express = require('express');
var LibreContoller = require('../controllers/libre');

var api = express.Router();
var md_auth = require('../middlewares/authenticated'); 
var md_admin = require('../middlewares/is_admin'); 



api.get('/pruebas-libres', md_auth.ensureAuth, LibreContoller.pruebas);
api.post('/libre', md_auth.ensureAuth, LibreContoller.saveLibre);
api.get('/libres',LibreContoller.getLibres);
api.get('/libre/:id',LibreContoller.getLibre);
api.put('/libre/:id', md_auth.ensureAuth, LibreContoller.updateLibre);

api.delete('/libre/:id', md_auth.ensureAuth, LibreContoller.deleteLibre);

module.exports = api;