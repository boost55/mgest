'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'Breyell1964';

exports.createToken = function(user){
	var payload = {
		sub: user._id,
		nombre: user.nombre,
		role: user.role,
		iat: moment().unix(),
		exp: moment().add(1, 'days').unix
	};

	return jwt.encode(payload, secret);
};