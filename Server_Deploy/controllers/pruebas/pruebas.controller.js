var connect = require('../../utils/connect');
var app = require('express')();
var jsreport = require('jsreport');

exports.prueba = function (req,res){
	require("jsreport").render("<h1>Hello world</h1>").then(function(out) {
		console.log(out);
	    out.result.pipe(res);
	});
}