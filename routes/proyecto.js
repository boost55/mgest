'use strict'

var express = require('express');
var ProyectoContoller = require('../controllers/proyecto');

var api = express.Router();
var md_auth = require('../middlewares/authenticated'); 
var md_admin = require('../middlewares/is_admin'); 

var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './uploads/proyecto' });


api.post('/proyecto', md_auth.ensureAuth, ProyectoContoller.saveProyecto);
api.post('/proyecto/:id', md_auth.ensureAuth, ProyectoContoller.updateProyecto);
api.get('/proyecto',ProyectoContoller.getProyectos);
api.get('/proyectosPendientes/:id',ProyectoContoller.getProyectosPend);
api.get('/proyecto/:id', ProyectoContoller.getProyecto);
api.delete('/proyecto/:id',[md_auth.ensureAuth, md_admin.isAdmin], ProyectoContoller.deleteProyecto);
api.get('/proyectoCliente/:id', ProyectoContoller.getProyectosCliente);
module.exports = api;