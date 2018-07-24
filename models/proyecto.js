'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProyectoSchema = Schema({
	estado: String,
	oferta: String,
	comentario: String,
	accion: String,
	fecha: String,
	hora: String,
	pendiente: Boolean,
	tienda: Number,
	cliente: { type: Schema.ObjectId, ref: 'Cliente'},
	user: String
});

module.exports = mongoose.model('Proyecto', ProyectoSchema);

