
var connect = require('../../utils/connect');
var app = require('express')();

function all (callback) {
	var query = "SELECT * FROM formaPago";
	connect.query(query,undefined,function (row) {
		if(callback) callback(row);
	});
}

exports.getAll = function (req,res){
	all(function (row) {
		res.json(row);
	});
}
exports.update = function (req , res) {
	var query = "UPDATE formaPago SET nombre = ? WHERE idFormaPago = ?;"
	connect.query(query,[req.body.nombre,req.body.idFormaPago],function (row) {
		
		all(function (rows) {
			res.json(rows);
		});
	})
}
exports.add = function (req,res) {
	var query = "INSERT INTO formaPago (nombre) VALUES ( ? ) ";
	connect.query('INSERT INTO listaprecio (lista) VALUES ( ? )',req.body.nombre);
	connect.query(query,req.body.nombre,function (row) {
		//console.log('INSERT',row);
		connect.query('SELECT * FROM servicio',undefined,function (rows) {
			var length = rows.length;

			query="INSERT INTO precioservicio (idServicio,idLista) VALUES (?,?)";
			function recursiva (index,length) {
				connect.query(query,[rows[index-1].idServicio,row.insertId] ,function (row2) {
					if(index == length){
						all(function (rows) {
							res.json(rows);
						});	
					}else{
						index++;	
						recursiva(index,length);
					}
				})
			}
			if(length > 0){
				recursiva(1,length);	
			}else{
				all(function (rows) {
					res.json(rows);
				});	

			}
			
			//console.log('selec * from servicio',rows);
		});

			
	});
}
exports.delete = function (req,res) {
	var query = "DELETE FROM formaPago WHERE idFormaPago = ?";
	connect.query(query,parseInt(req.query.id),function (row) {
		query = "DELETE FROM listaprecio WHERE idLista = ?";
		connect.query(query,parseInt(req.query.id),function (row) {
			all(function (rows) {
				res.json(rows);
			});	
		});	
	});
}