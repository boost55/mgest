'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ImagenSchema = Schema({
	nombre: String,
	cliente: { type: Schema.ObjectId, ref: 'Cliente'},
	user: { type: Schema.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Imagen', ImagenSchema);