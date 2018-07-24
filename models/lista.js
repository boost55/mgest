'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
	orden: Number,
	nombre: String,
	texto: String
});

module.exports = mongoose.model('Lista', UserSchema);