'use strict'

// modulos
var bcrypt = require('bcrypt-nodejs');
var fs = require('fs');
var path = require('path');

// modelos
var User = require('../models/user');

// servicio jwt
var jwt = require('../services/jwt');

// acciones
function pruebas(req, res) {
	res.status(200).send({
		message: 'Probando el controlador de usuarios y la acción pruebas',
		user: req.user
	});
}

function saveUser(req, res) {
	var params = req.body;
	if (params._id) {
		User.findById(params._id, (err, issetUser) => {

			var update = req.body;

			User.findByIdAndUpdate(update._id, update, {
				new: true
			}, (err, userUpdated) => {
				if (err) {
					res.status(500).send({
						message: 'Error en la petición'
					});
				} else {
					if (!userUpdated) {
						res.status(404).send({
							message: 'No se ha actualizado el user'
						});
					} else {
						res.status(200).send({
							user: userUpdated
						});
					}
				}

			});
		})



	} else {
		// Asignar valores al objeto de usuario
		var user = new User();
		User.findOne({
			nombre: params.nombre
		}, (err, issetUser) => {
			if (issetUser) {
				res.status(200).send({
					message: 'El nombre ya existe'
				});
			} else {
				user.nombre = params.nombre;
				user.role = params.role;
				bcrypt.hash(params.password, null, null, function (err, hash) {
					user.password = hash;

					// Guardar usuario en bd
					user.save((err, userStored) => {
						if (err) {
							res.status(500).send({
								message: 'Error al guardar el usuario'
							});
						} else {
							if (!userStored) {
								res.status(404).send({
									message: 'No se ha registrado el usuario'
								});
							} else {
								res.status(200).send({
									user: userStored
								});
							}
						}
					});

				});
			}
		});


	}


}




function login(req, res) {
	var params = req.body;

	var nombre = params.nombre;
	var password = params.password;

	User.findOne({
		nombre: nombre.toLowerCase()
	}, (err, user) => {
		if (err) {
			res.status(500).send({
				message: 'Error al comprobar el usuario'
			});
		} else {
			if (user) {
				bcrypt.compare(password, user.password, (err, check) => {
					if (check) {

						if (params.gettoken) {
							//devolver token jwt
							res.status(200).send({
								token: jwt.createToken(user)
							});
						} else {
							res.status(200).send({
								user
							});
						}


					} else {
						res.status(404).send({
							message: 'El usuario no ha podido loguearse correctamente'
						});
					}
				});

			} else {
				/*res.status(404).send({
					message: 'El usuario no ha podido loguearse'
				});*/

				User.find().exec((err, users) => {

					if (err) {
						res.status(500).send({
							message: 'Error en la petición'
						});
					} else {
						
						if (users.length== 0)  {
						
							var user = new User();
							user.nombre = params.nombre;
							user.role = "ROLE_ADMIN";

							bcrypt.hash(params.password, null, null, function (err, hash) {
								user.password = hash;

								// Guardar usuario en bd
								user.save((err, userStored) => {
									if (err) {
										res.status(500).send({
											message: 'Error al guardar el usuario'
										});
									} else {
										if (!userStored) {
											res.status(404).send({
												message: 'No se ha registrado el usuario'
											});
										} else {
											res.status(200).send({
												user: userStored
											});
										}
									}
								});
							});
						}
					}
				});


			};
		}

	});
};

function getUser(req, res) {
	var userId = req.params.id;

	User.findById(userId).exec((err, user) => {
		//User.findById(id).populate({path: 'user'}).exec((err, users) => {
		if (err) {
			res.status(500).send({
				message: 'Error en la petición'
			});
		} else {
			if (!user) {
				res.status(404).send({
					message: 'No hay user'
				});
			} else {
				res.status(200).send({
					user
				});
			}
		}
	});
}


function getListaUser(req, res) {
	User.find().exec((err, users) => {
		if (err) {
			res.status(500).send({
				message: 'Error en la petición'
			});
		} else {
			if (!users) {
				res.status(404).send({
					message: 'No hay cuidadores'
				});
			} else {
				res.status(200).send({
					users
				});
			}
		}
	});
}

function deleteUser(req, res) {
	var userId = req.params.id;
	//User.findByIdAndRemove(userId,  (err, userRemoved) => {
	User.findByIdAndRemove(userId, (err, userRemoved) => {
		if (err) {
			res.status(500).send({
				message: 'Error en la petición'
			});
		} else {
			if (!userRemoved) {
				res.status(404).send({
					message: 'No se ha borrado el user'
				});
			} else {
				res.status(200).send({
					user: userRemoved
				});
			}
		}
	});
}
module.exports = {
	pruebas,
	saveUser,
	login,
	deleteUser,
	getListaUser,
	getUser
};