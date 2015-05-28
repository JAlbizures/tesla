
var connect = require('../../utils/connect');

function all (callback) {
	var query = "SELECT * FROM usuario";	
	connect.query(query,undefined,function (rows) {
		callback(rows);
	});}

exports.getAll = function(req, res) {
	var query = "SELECT * FROM usuario";
	//console.log(connect);
	all(function (rows) {
		res.json(rows);
	});
}

exports.update = function (req,res) {
	console.log(req.body);
	console.log(req.params);
	console.log(req.query);
	var query = "UPDATE usuario SET nombre = ?, rol = ?, pass = ?, usuario = ? WHERE idUsuarios = ?;";
	var data = [req.body.nombre,req.body.rol,req.body.pass,req.body.usuario,parseInt(req.body.idUsuarios)];
	//res.json({});
	connect.query(query,data,function (row) {
		
		all(function (rows) {
			res.json(rows);
		});
	});
}
exports.add = function (req, res) {
	//console.log(req.body);
	var query = "INSERT INTO usuario (nombre, rol, pass, usuario) VALUES ( ?, ?, ?, ?)";
	var data = [req.body.nombre,req.body.rol,req.body.pass,req.body.usuario];
	connect.query(query,data,function (row) {
		all(function (rows) {
			res.json(rows);
		});
	});
}
exports.delete = function (req,res) {
	var query = "DELETE FROM usuario WHERE idUsuarios = ?";
	
	connect.query(query,parseInt(req.query.id),function (row) {

		all(function (rows) {
			res.json(rows);
		});
	});
}
exports.auth = function(req, res) {
	//console.log('auth');
	var query = "SELECT * FROM usuario WHERE usuario = ? AND pass = ?";
	data = [req.body.usuario, req.body.pass];

	connect.query(query,data,function (row) {
		//console.log(data);
		res.json(row);
	});
}