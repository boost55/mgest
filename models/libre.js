'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LibreSchema = Schema({
	marca: String,
	description: String,
	fecha: String,
	proveedor:  { type: Schema.ObjectId, ref: 'Proveedor'},
	coste: Number,
	pvp: Number
});

module.exports = mongoose.model('Libre', LibreSchema);
