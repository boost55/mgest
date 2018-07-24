'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClienteSchema = Schema({
	dniCif: String,
	nombre: String,
	calle: String,
	codPostal: String,
	localidad: String,
	eMail: String,
	fechaNacimiento: String,
	nombreComercial: String,
	nrTelefono: String,
	nrTelefono2: String,
	image: String,
	user: String
});

module.exports = mongoose.model('Cliente', ClienteSchema);
