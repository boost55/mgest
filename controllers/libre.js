'use strict'

// modulos
var fs = require('fs');
var path = require('path');

// modelos
var User = require('../models/user');
var Libre = require('../models/libre');

// acciones
function pruebas(req, res){
	res.status(200).send({
		message: 'Probando el controlador de librees y la acción pruebas',
		user: req.user
	});
}

function saveLibre(req, res){
	var libre = new Libre();

	var params = req.body;

	if(params.description){
		libre.marca = params.marca;
		libre.descripcion = params.description;
		libre.proveedor =  req.proveedor.sub;
		libre.coste = params.coste;
		libre.pvp = params.pvp;

		libre.save((err, libreStored) => {
			if(err){
				res.status(500).send({message: 'Error en el servidor'});
			}else{
				if(!libreStored){
					res.status(404).send({message: 'No se ha guardado el libre'});
				}else{
					res.status(200).send({libre: libreStored});
				}
			}
		});

	}else{
		res.status(200).send({
			message: 'El nombre del libre es obligatorio'
		});
	}
}

function getLibres(req, res){
	Libre.find({}).populate({path: 'proveedor'}).exec((err, libres) => {
		if(err){
			res.status(500).send({
				message: 'Error en la petición'
			});
		}else{
			if(!libres){
				res.status(404).send({
					message: 'No hay librees'
				});
			}else{
				res.status(200).send({
					libres
				});
			}
		}
	});
}

function getLibre(req, res){
	var libreId = req.params.id;

	Libre.findById(libreId).populate({path: 'proveedor'}).exec((err, libre) => {
		if(err){
			res.status(500).send({
				message: 'Error en la petición'
			});
		}else{
			if(!libre){
				res.status(404).send({
					message: 'El libre no existe'
				});
			}else{
				res.status(200).send({
					libre
				});
			}
		}
	});
}

function updateLibre(req, res){
	var libreId = req.params.id;
	var update = req.body;

	Libre.findByIdAndUpdate(libreId, update, {new:true}, (err, libreUpdated) => {
		if(err){
			res.status(500).send({
				message: 'Error en la petición'
			});
		}else{
			if(!libreUpdated){
				res.status(404).send({
					message: 'No se ha actualizado el libre'
				});
			}else{
				res.status(200).send({libre: libreUpdated});
			}
		}
	});
}



function deleteLibre(req, res){
	var libreId = req.params.id;

	Libre.findByIdAndRemove(libreId, (err, libreRemoved) => {
		if(err){
			res.status(500).send({message: 'Error en la petición'});
		}else{
			if(!libreRemoved){
				res.status(404).send({message: 'No se ha borrado el libre'});
			}else{
				res.status(200).send({libre: libreRemoved});
			}
		}
	});
}

module.exports = {
	pruebas,
	saveLibre,
	getLibres,
	getLibre,
	updateLibre,
	deleteLibre
};