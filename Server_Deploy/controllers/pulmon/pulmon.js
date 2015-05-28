var express = require('express');
var controller = require('./pulmon.controller');

var router = express.Router();



module.exports = function (io) {
	router.post('/crear', controller.add(io));
	return router; 
};

