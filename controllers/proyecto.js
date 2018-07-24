'use strict'

// modulos
var fs = require('fs');
var path = require('path');

// modelos
//var User = require('../models/user');
var Proyecto = require('../models/proyecto');

// acciones
function fFecha() {
	var vFecha = new Date();
	var vMes =vFecha.getMonth()+1;
	 vMes = vMes.toString();
	var vNum =  vMes.length;
	if(vNum ==1){vMes = "0" + vMes};
	var vDia = vFecha.getDate();
	vDia = vDia.toString();
	var vNum =  vDia.length;
	if(vNum ==1){vDia = "0" + vDia};
	 return vFecha.getFullYear()+'-'+ vMes+'-'+ vDia;
	

}
function fFecha15() {
	var vFecha = new Date();
	var vMes =vFecha.getMonth()+1; 
	var vDia = vFecha.getDate()+15;
	var vAno = vFecha.getFullYear();
	if(vDia >28){
		vDia = vDia -28;
		vMes = vMes +1;
		if(vMes >12){
			vMes =1;
			vAno = +1
		};
	};
	vDia = vDia.toString();
	var vNum =  vDia.length;
	if(vNum ==1){vDia = "0" + vDia};
	vMes = vMes.toString();
	var vNum =  vMes.length;
	if(vNum ==1){vMes = "0" + vMes};
	vAno = vAno.toString();
	 return vAno+'-'+ vMes+'-'+ vDia;
	

}
function fHora() {
	var vFecha = new Date();
	var vHoras =vFecha.getHours();
	vHoras = vHoras.toString();
	var vNum =  vHoras.length;
	if(vNum ==1){vHoras = "0" + vHoras};
	var vMinutos = vFecha.getMinutes();
	vMinutos = vMinutos.toString();
	var vNum =  vMinutos.length;
	if(vNum ==1){vMinutos = "0" + vMinutos};
	return vHoras+':'+ vMinutos;
	
}

function updateProyecto(req, res) {
	var update = req.body;

	Proyecto.findByIdAndUpdate(update._id, update, {
		new: true
	}, (err, proyectoUpdated) => {
		if (err) {
			res.status(500).send({
				message: 'Error en la petición'
			});
		} else {
			if (!proyectoUpdated) {
				res.status(404).send({
					message: 'No se ha actualizado el proyecto'
				});
			} else {
				res.status(200).send({
					proyecto: proyectoUpdated
				});
			}
		}
	})
}

function saveProyecto(req, res) {
	var params = req.body;
	
	var proyecto = new Proyecto();
	proyecto.estado = "";
	proyecto.oferta = "";
	proyecto.comentario = "";
	proyecto.accion = "";
	proyecto.fecha = fFecha15();
	proyecto.hora = fHora();
	proyecto.pendiente = false;
	proyecto.tienda = params.tienda;
	proyecto.user = req.user.nombre;
	proyecto.cliente = params;

	proyecto.save((err, proyectoStored) => {
		if (err) {
			res.status(500).send({
				message: 'Error en el servidor'
			});
		} else {
			if (!proyectoStored) {
				res.status(404).send({
					message: 'No se ha guardado el proyecto'
				});
			} else {
				res.status(200).send({
					proyecto: proyectoStored
				});
			}
		}
	});
}

function getProyectosCliente(req, res) {
	var clienteId = req.params.id;
	//Proyecto.find({}).populate({path: 'user'})
	Proyecto.find({cliente: clienteId}).populate('cliente')
		.exec((err, proyectos) => {
			if (err) {
				res.status(500).send({
					message: 'Error en la petición'
				});
			} else {
				if (!proyectos) {
					res.status(404).send({
						message: 'No hay proyectoes'
					});
				} else {
					for (var i = 0; i < proyectos.length; i++) {
						var nfecha2 = proyectos[i].fecha;
						var nFecha = nfecha2.split("-");
						proyectos[i].fecha = (nFecha[2] + '/' + nFecha[1] + '/' + nFecha[0]);
					}


					res.status(200).send({
						proyectos
					});
				}
			}
		});
}

function getProyectos(req, res) {
	//Proyecto.find({}).populate({path: 'user'})
	Proyecto.find({}).populate('cliente')
		.exec((err, proyectos) => {
			if (err) {
				res.status(500).send({
					message: 'Error en la petición'
				});
			} else {
				if (!proyectos) {
					res.status(404).send({
						message: 'No hay proyectoes'
					});
				} else {
					for (var i = 0; i < proyectos.length; i++) {
						var nfecha2 = proyectos[i].fecha;
						var nFecha = nfecha2.split("-");
						proyectos[i].fecha = (nFecha[2] + '/' + nFecha[1] + '/' + nFecha[0]);
					}


					res.status(200).send({
						proyectos
					});
				}
			}
		});
}

function getProyectosPend(req, res) {
	var vTienda = req.params.id;
	var fecha = fFecha15();
	Proyecto.find({pendiente: true , tienda: vTienda, fecha: { $lt: fecha }}).populate('cliente')
		.exec((err, proyectos) => {
			if (err) {
				res.status(500).send({
					message: 'Error en la petición'
				});
			} else {
				if (!proyectos) {
					res.status(404).send({
						message: 'No hay proyectoes'
					});
				} else {
					for (var i = 0; i < proyectos.length; i++) {
						var nfecha2 = proyectos[i].fecha;
						var nFecha = nfecha2.split("-");
						proyectos[i].fecha = (nFecha[2] + '/' + nFecha[1] + '/' + nFecha[0]);
					}


					res.status(200).send({
						proyectos
					});
				}
			}
		});
}
function getProyecto(req, res) {
	var proyectoId = req.params.id;

	Proyecto.findById(proyectoId).populate('cliente').exec((err, proyecto) => {
		if (err) {
			res.status(500).send({
				message: 'Error en la petición'
			});
		} else {
			if (!proyecto) {
				res.status(404).send({
					message: 'El proyecto no existe'
				});
			} else {
				res.status(200).send({
					proyecto
				});
			}
		}
	});
}





function deleteProyecto(req, res) {
	var proyectoId = req.params.id;

	Proyecto.findByIdAndRemove(proyectoId, (err, proyectoRemoved) => {
		if (err) {
			res.status(500).send({
				message: 'Error en la petición'
			});
		} else {
			if (!proyectoRemoved) {
				res.status(404).send({
					message: 'No se ha borrado el proyecto'
				});
			} else {
				res.status(200).send({
					proyecto: proyectoRemoved
				});
			}
		}
	});
}

module.exports = {
	
	saveProyecto,
	updateProyecto,
	getProyectos,
	getProyecto,
	getProyectosCliente,
	deleteProyecto,
	getProyectosPend
};