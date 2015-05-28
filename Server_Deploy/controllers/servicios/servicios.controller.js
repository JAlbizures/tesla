
var connect = require('../../utils/connect');

function all (callback) {
	var query = "SELECT * FROM servicio";	
	connect.query(query,undefined,function (rows) {
		callback(rows);
	});}

exports.getAll = function(req, res) {
	all(function (rows) {
		res.json(rows);
	});
}
exports.preciosAll = function  (req,res) {
	all(function (rows) {
		//console.log(rows);
		var index = rows.length;
		var query = "SELECT idLista, precio FROM precioservicio WHERE idServicio=?";
		var precios = {};
		function recursiva (contador,index) {
			//console.log(index,contador);
			connect.query(query,rows[contador-1].idServicio,function (row) {
				var dataPrecios = {};
				for (var i = row.length - 1; i >= 0; i--) {
					dataPrecios[row[i].idLista] = row[i].precio;
				};
				precios[rows[contador-1].idServicio] = dataPrecios;
				if(contador == index){
					res.json(precios);
				}else{
					contador++;
					recursiva(contador,index);
				}
			});
		}
		recursiva(1,index);
	});
}
exports.update = function (req,res) {
	console.log(req.body);
	// console.log(req.params);
	// console.log(req.query);
	req.body.tecnico = (req.body.tecnico)? 1 : 0;
	var query = "UPDATE servicio SET nombre = ? ,numeroserial = ?, tecnico = ?, tipo = ? WHERE idServicio = ?;";
	var data = [req.body.nombre,parseFloat(req.body.numeroserial),req.body.tecnico,req.body.tipo,parseInt(req.body.idServicio)];
	//res.json({});
	connect.query(query,data,function (row) {
		
		all(function (rows) {
			res.json(rows);
		});
	})
}
exports.add = function (req, res) {
	console.log(req.body);
	var query = "INSERT INTO servicio (nombre, numeroserial,tecnico,tipo) VALUES ( ?, ? , ? , ?)";
	var data = [req.body.nombre,req.body.numeroserial,req.body.tecnico, req.body.tipo];

	connect.query(query,data,function (row) {
		//console.log(row);

		query = "INSERT INTO precioservicio (idServicio, idLista, precio) VALUES ( ?, ? , ? )" ;
		var formaPago
		function recursiva (id,cantidad) {
			connect.query(query,[row.insertId,formaPago[id-1].idFormaPago,req.body.precio],function (row) {
				//console.log(id ,cantidad)
				if(id == cantidad){
				//console.log('termino')
					all(function (rows) {
						res.json(rows);
					});
				}else{
					//console.log(id);
					id++;
					recursiva(id, cantidad);
				}
			});
		}
		connect.query('SELECT * from formaPago',undefined,function (row2) {
			formaPago = row2
			console.log(row2);
			if(row2.length){
				recursiva(1,row2.length);
			}else{
				all(function (rows) {
					res.json(rows);
				});
			}
			
		})
		
		// all(function (rows) {
		// 	res.json(rows);
		// });
	});
	
}
exports.delete = function (req,res) {
	var query = "DELETE FROM servicio WHERE idServicio = ?";
	// console.log(parseInt(req.query.id));
	// console.log(req.query.id);
	connect.query(query,parseInt(req.query.id),function (row) {

		all(function (rows) {
			res.json(rows);
		});
	});
}
exports.preciosByservicio = function (req,res) {
	// var query = 'SELECT p.idPrecioServicio, p.precio, p.idServicio, p.idLista, l.nombre  FROM precioservicio AS p INNER JOIN formaPago as l ON p.idLista=l.idFormaPago ';
	// query =+ 'WHERE p.idServicio = ?';
	//res.json([]);
	var query = 'SELECT p.idPrecioServicio, p.precio, p.idServicio, p.idLista, l.nombre  FROM precioservicio AS p INNER JOIN formaPago as l ON p.idLista=l.idFormaPago WHERE p.idServicio = ?';
	connect.query(query,req.query.id,function (row) {
		res.json(row);
	})	
}
exports.changePrecio = function (req,res) {
	var precios = req.body;
	var cantidad = req.body.length;
	var query = "UPDATE precioservicio SET precio= ? WHERE idPrecioServicio=?;";
	function recursiva (contador, cantidad) {
		var data = [
			precios[contador-1].precio,
			precios[contador-1].idPrecioServicio
		];
		connect.query(query,data,function (argument) {
			if(contador == cantidad){
				res.json([]);
			}else{
				contador++;
				recursiva(contador,cantidad);
			}
		});
	}
	recursiva(1,cantidad);
	//res.json([]);
}