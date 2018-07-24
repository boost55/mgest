'use strict';

// modulos
var fs = require('fs');
var path = require('path');

// modelos
var Lista = require('../models/lista');

// servicio jwt
var jwt = require('../services/jwt');

// acciones
function pruebas(req, res) {
	res.status(200).send({
		message: 'Probando el controlador de lista y la acción pruebas',
		lista: req.lista
	});
}

function saveLista(req, res) {
	var params = req.body;
	Lista.findById(params._id, (err, issetLista) => {

		if (!issetLista) {
			var lista = new Lista();
			lista.orden = params.orden;
			lista.nombre = params.nombre;
			lista.texto = params.texto;


			lista.save((err, listaStored) => {
				if (err) {
					res.status(500).send({
						message: 'Error en el servidor'
					});
				} else {
					if (!listaStored) {
						res.status(404).send({
							message: 'No se ha guardado el lista'
						});
					} else {
						res.status(200).send({
							lista: listaStored
						});
					}
				}
			});
		}else{
			
			var update = params;
		
			Lista.findByIdAndUpdate(update._id, update, {
				new: true
			}, (err, listaUpdated) => {
				if (err) {
					res.status(500).send({
						message: 'Error al actualizar lista'
					});
				} else {
					if (!listaUpdated) {
						res.status(404).send({
							message: 'No se ha podido actualizar el lista'
							
						});
					} else {
						res.status(200).send({
							lista: listaUpdated
						});
					}
				}
			});
		}
	});

}




function getLista(req, res) {
	var listaId = req.params.id;
	//Lista.findById(listaId,{role:'ROLE_ADMIN'},(err, lista) => {
	Lista.findById(listaId).exec((err, lista) => {
		//Lista.findById(listaId,(err, lista) => {
		if (err) {
			res.status(500).send({
				message: 'Error en la petición'
			});
		} else {
			if (!lista) {
				res.status(404).send({
					message: 'No hay cuidadores'
				});
			} else {
				res.status(200).send({
					lista
				});
			}
		}
	});
}

function getListas(req, res) {
	Lista.find({}).exec((err, listas) => {
		if (err) {
			res.status(500).send({
				message: 'Error en la petición'
			});
		} else {
			if (!listas) {
				res.status(404).send({
					message: 'No hay listas'
				});
			} else {
				res.status(200).send({
					listas
				});
			}
		}
	});
}

function deleteLista(req, res) {
	var listaId = req.params;
	//Lista.findByIdAndRemove(listaId,  (err, listaRemoved) => {
	Lista.findByIdAndRemove(listaId, (err, listaRemoved) => {
		if (err) {
			res.status(500).send({
				message: 'Error en la petición'
			});
		} else {
			if (!listaRemoved) {
				res.status(404).send({
					message: 'No se ha borrado el lista'
				});
			} else {
				res.status(200).send({
					lista: listaRemoved
				});
			}
		}
	});
}
function getList(req, res) {
	var params = req.params;
	var listaNombre = params.id;
	Lista.find({nombre: listaNombre},(err, lista) => {
	
		if (err) {
			res.status(500).send({
				message: 'Error en la petición'
			});
		} else {
			if (!lista) {
				res.status(404).send({
					message: 'No hay ' + listaNombre
				});
			} else {
				res.status(200).send({
					lista
					//params
				});
			}
		}
	});
}
module.exports = {
	saveLista,
	getLista,
	getList,
	deleteLista,
	getListas
};