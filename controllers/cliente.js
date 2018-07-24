'use strict';

// modulos
var fs = require('fs');
var path = require('path');

// modelos
var User = require('../models/user');
var Cliente = require('../models/cliente');
var Imagen = require('../models/imagen');

// acciones
function pruebas(req, res){
	res.status(200).send({
		message: 'Probando el controlador de clientes y la acción pruebas',
		user: req.user
	});
}


function saveCliente(req, res){
	var params = req.body;
	Cliente.findOne({dniCif: params.dniCif}, (err, issetCliente) => {
		if(err){
			res.status(500).send({message: 'Error al comprobar el cliente'});
		}else{
			if(!issetCliente){
				var cliente = new Cliente();				
					cliente.dniCif = params.dniCif.toUpperCase();
					cliente.nombre = params.nombre;
					cliente.calle = params.calle;
					cliente.codPostal = params.codPostal;
					cliente.localidad = params.localidad;
					cliente.eMail = params.eMail;
					cliente.nrTelefono = params.nrTelefono;
					cliente.nrTelefono2 = params.nrTelefono2;
					cliente.fechaNacimiento = params.fechaNacimiento;
					cliente.nombreComercial = params.nombreComercial;
					cliente.image = params.image;
					cliente.user = req.user.nombre;

					cliente.save((err, clienteStored) => {
						if(err){
							res.status(500).send({message: 'Error en el servidor'});
						}else{
									if(!clienteStored){
										res.status(404).send({message: 'No se ha guardado el cliente'});
									}else{
										res.status(200).send({cliente: clienteStored});
									}
						}
					});
				

				
			}else{
			
				var update = req.body;
				var vDniCif = { dniCif: update.dniCif };
				Cliente.findOneAndUpdate(vDniCif, update, {new:true}, (err, clienteUpdated) => {
					if(err){
						res.status(500).send({
							message: 'Error en la petición'
						});
					}else{
						if(!clienteUpdated){
							res.status(404).send({
								message: 'No se ha actualizado el cliente'
							});
						}else{
							res.status(200).send({cliente: clienteUpdated});
						}
					}
				});

			}
		}
			
			
	});
	
}

function getClientes(req, res){
	Cliente.find({}).exec((err, clientes) => {
		if(err){
			res.status(500).send({
				message: 'Error en la petición'
			});
		}else{
			if(!clientes){
				res.status(404).send({
					message: 'No hay clientes'
				});
			}else{
				res.status(200).send({
					clientes
				});
			}
		}
	});
}

function getCliente(req, res){
	var clienteDniCif = req.params.id;

	Cliente.findOne({dniCif: clienteDniCif}).exec((err, cliente) => {
		if(err){
			res.status(500).send({
				message: 'Error en la petición'
			});
		}else{
			if(!cliente){
				res.status(404).send({
					message: 'El cliente no existe'
				});
			}else{
				res.status(200).send({
					cliente
				});
			}
		}
	});
}


function deleteCliente(req, res){
	var clienteId = req.params.id;
	//Cliente.findByIdAndRemove(clienteId,  (err, clienteRemoved) => {
	Cliente.findOneAndRemove({dniCif: clienteId}, (err, clienteRemoved) => {
		if(err){
			res.status(500).send({message: 'Error en la petición'});
		}else{
			if(!clienteRemoved){
				res.status(404).send({message: 'No se ha borrado el cliente'});
			}else{
				res.status(200).send({cliente: clienteRemoved});
			}
		}
	});
}


function uploadImage(req, res){
	var clienteId = req.params.id;
	//var file_name = 'No subido...';
	
	if(req.files){
		
		var file_path = req.files.image.path;
		var file_split = file_path.split('\\');
		var file_name2 = file_split[2];
		var file_name =	req.files.image.originalFilename;
		var ext_split = file_name.split('\.');
		var file_ext = ext_split[1];

		if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'pdf' || file_ext == 'gif'){

			Cliente.findOneAndUpdate({dniCif: clienteId}, {image: file_name}, {new:true}, (err, clienteUpdated) => {
				if(err){
					res.status(500).send({
						message: 'Error al actualizar usuario'
					});
				}else{
					if(!clienteUpdated){
						res.status(404).send({message: 'No se ha podido actualizar el cliente'});
					}else{
						var dir = './uploads/cliente/'+ clienteUpdated.dniCif;

					if (!fs.existsSync(dir)){
					    fs.mkdirSync(dir);
					}
					fs.rename('./uploads/cliente/'+ file_name2, dir + '/' + file_name, function(err) {
					    if ( err ) console.log('ERROR: ' + err);
					});

						res.status(200).send({cliente: clienteUpdated, image: file_name});
					}
				}
			});

		}else{
			fs.unlink(file_path, (err) => {
				if(err){
					res.status(200).send({message: 'Extensión no valida y fichero no'});
				}else{
					res.status(200).send({message: 'Extensión no valida'});
				}
			});
		}

	}else{
		res.status(200).send({message: 'No se han subido archivos'});
	}
}

function saveImagen(req, res){
	var params = req.body;
	
				var imagen = new Imagen();
				
					
					imagen.nombre = 'test';
					

					imagen.save((err, imagenStored) => {
						if(err){
							res.status(500).send({message: 'Error en el servidor'});
						}else{
									if(!imagenStored){
										res.status(404).send({message: 'No se ha guardado el imagen'});
									}else{
										res.status(200).send({imagen: imagenStored});
									}
						}
					});	
}
module.exports = {
	pruebas,
	saveCliente,
	getClientes,
	getCliente,
	deleteCliente,
	uploadImage
};