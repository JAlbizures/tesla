var express = require('express');
var controller = require('./facturas.controller');

var router = express.Router();

//router.get('/', controller.getAll);

//router.delete('/:id', controller.delete);
//router.put('/', controller.update);

module.exports = function (io) {
	router.post('/crear', controller.add(io),controller.correlactivo);
	router.get('/correlativo/', controller.correlactivo);
	router.put('/cambiarEstado/',controller.cambiarEstado(io));
	return router;
} 


