'use strict';

// modulos
var fs = require('fs');
var path = require('path');

// modelos
var User = require('../models/user');
var Proveedor = require('../models/proveedor');

// acciones
function pruebas(req, res) {
	res.status(200).send({
		message: 'Probando el controlador de proveedores y la acción pruebas',
		user: req.user
	});
}

function saveProveedor(req, res) {
	var params = req.body;
	Proveedor.findOne({
		dniCif: params.dniCif
	}, (err, issetProveedor) => {
		if (err) {
			res.status(500).send({
				message: 'Error al comprobar el proveedor'
			});
		} else {
			if (!issetProveedor) {
				var proveedor = new Proveedor();
				proveedor.dniCif = params.dniCif.toUpperCase();
				proveedor.nombre = params.nombre;
				proveedor.calle = params.calle;
				proveedor.codPostal = params.codPostal;
				proveedor.localidad = params.localidad;
				proveedor.eMail = params.eMail;
				proveedor.nrTelefono = params.nrTelefono;
				proveedor.nrTelefono2 = params.nrTelefono2;

				proveedor.nombreComercial = params.nombreComercial;

				proveedor.user = req.user.nombre;

				proveedor.save((err, proveedorStored) => {
					if (err) {
						res.status(500).send({
							message: 'Error en el servidor'
						});
					} else {
						if (!proveedorStored) {
							res.status(404).send({
								message: 'No se ha guardado el proveedor'
							});
						} else {
							res.status(200).send({
								proveedor: proveedorStored
							});
						}
					}
				});



			} else {

				var update = req.body;
				var vDniCif = {
					dniCif: update.dniCif
				};
				Proveedor.findOneAndUpdate(vDniCif, update, {
					new: true
				}, (err, proveedorUpdated) => {
					if (err) {
						res.status(500).send({
							message: 'Error en la petición'
						});
					} else {
						if (!proveedorUpdated) {
							res.status(404).send({
								message: 'No se ha actualizado el proveedor'
							});
						} else {
							res.status(200).send({
								proveedor: proveedorUpdated
							});
						}
					}
				});

			}
		}


	});

}

function getProveedores(req, res) {
	Proveedor.find({}).exec((err, proveedores) => {
		if (err) {
			res.status(500).send({
				message: 'Error en la petición'
			});
		} else {
			if (!proveedores) {
				res.status(404).send({
					message: 'No hay proveedores'
				});
			} else {
				res.status(200).send({
					proveedores
				});
			}
		}
	});
}
function getProveedor(req, res){
var proveedorDniCif = req.params.id;

Proveedor.findOne({
	dniCif: proveedorDniCif
}).exec((err, proveedor) => {
	if (err) {
		res.status(500).send({
			message: 'Error en la petición'
		});
	} else {
		if (!proveedor) {
			res.status(404).send({
				message: 'El proveedor no existe'
			});
		} else {
			res.status(200).send({
				proveedor
			});
		}
	}
});
};

function deleteProveedor(req, res) {
	var proveedorId = req.params.id;
	//Proveedor.findByIdAndRemove(proveedorId,  (err, proveedorRemoved) => {
	Proveedor.findOneAndRemove({
		dniCif: proveedorId
	}, (err, proveedorRemoved) => {
		if (err) {
			res.status(500).send({
				message: 'Error en la petición'
			});
		} else {
			if (!proveedorRemoved) {
				res.status(404).send({
					message: 'No se ha borrado el proveedor'
				});
			} else {
				res.status(200).send({
					proveedor: proveedorRemoved
				});
			}
		}
	});
}
/*
function updateProveedor(req, res){
	var proveedorId = req.params.id;
	var update = req.body;

	Proveedor.findByIdAndUpdate(proveedorId, update, {new:true}, (err, proveedorUpdated) => {
		if(err){
			res.status(500).send({
				message: 'Error en la petición'
			});
		}else{
			if(!proveedorUpdated){
				res.status(404).send({
					message: 'No se ha actualizado el proveedor'
				});
			}else{
				res.status(200).send({proveedor: proveedorUpdated});
			}
		}
	});
}
*/



module.exports = {
	pruebas,
	saveProveedor,
	getProveedores,
	getProveedor,
	deleteProveedor
};