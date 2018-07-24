'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProveedorSchema = Schema({
	dniCif: String,
	nombre: String,
	calle: String,
	codPostal: String,
	localidad: String,
	eMail: String,
	nombreComercial: String,
	nrTelefono: String,
	nrTelefono2: String,
	user: String
});

module.exports = mongoose.model('Proveedor', ProveedorSchema);