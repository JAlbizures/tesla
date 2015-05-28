
var connect = require('../../utils/connect');
var app = require('express')();


exports.add = function  (io) {
	return function  (req,res) {
		io.sockets.emit('nuevoServicio',{'prueba':'prueba'});
		res.json({a :1});	
	}	
}