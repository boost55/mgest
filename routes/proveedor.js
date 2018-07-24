'use strict'

var express = require('express');
var ProveedorContoller = require('../controllers/proveedor');

var api = express.Router();
var md_auth = require('../middlewares/authenticated'); 
var md_admin = require('../middlewares/is_admin'); 



api.get('/pruebas-proveedores', md_auth.ensureAuth, ProveedorContoller.pruebas);
api.post('/proveedor', md_auth.ensureAuth, ProveedorContoller.saveProveedor);
api.get('/proveedores', ProveedorContoller.getProveedores);
api.get('/proveedor/:id', ProveedorContoller.getProveedor);

api.delete('/proveedor/:id', [md_auth.ensureAuth, md_admin.isAdmin], ProveedorContoller.deleteProveedor);

module.exports = api;