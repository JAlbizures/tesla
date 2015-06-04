
var connect = require('../../utils/connect');
var servicioTecnico;
exports.add = function (io) {
	return function (req, res,next) {
		//console.log(req.body);
		//query = "INSERT INTO factura (serie, numero, nombre,edad,telefono, nit,direccion,fecha,monto,paciente, formaPago) VALUES ( ?, ?, ? , ? ,?, ?, ?, ?, ?, ?, ?)";	
		// serie, numero, nombre,edad,telefono, nit,direccion,monto,paciente, formaPago
		var query = "SELECT  sp_ins_factura_servicio ( ?, ?, ? , ? ,?, ?, ?, ?, ?, ? , ?, ?) as insertId";	
		if(req.body.formaPago.nombre.toLowerCase() != "contado" || req.body.formaPago.nombre.toLowerCase() != "tarjeta de credito"){
			req.body.nit = "";
			req.body.direccion = "";
			req.body.serie = "";
			req.body.numero = 0;
			req.body.nombre = "";

		}else{
			req.body.formaPagoRef = ""
		}
		console.log(req.body);
		var data = [
			req.body.serie,
			parseInt(req.body.numero),
			req.body.nombre,
			req.body.edad,
			parseFloat(req.body.telefono),
			req.body.nit,
			req.body.direccion,
			parseFloat(req.body.monto),
			req.body.paciente,
			parseInt(req.body.formaPago.idFormaPago),
			req.body.usuario,
			req.body.formaPagoRef
		];
		
		//console.log(req.body);
		
		console.log(data);
		connect.query(query,data,function (row) {
			
			//console.log(row); idfactura, servicio,
			var query2 = 'CALL sp_ins_facturadetalle_servicio(?, ?, ?, ?, ?, ?)';
			//query2 = "INSERT INTO facturadetalle (idFactura, idServicio, cantidad, precio, nombre, tec) VALUES (?, ?, ?, ?, ?)";
			var  detalle = req.body.faturaDetalle;
			var data = [];
			console.log(detalle);
			for(var index  in detalle){
				detalle[index].tecnico = (detalle[index].tecnico) ? 1 : 0;
				element = [
					row[0].insertId,
					detalle[index].idServicio,
					detalle[index].cantidad,
					detalle[index].precio,
					detalle[index].nombre,
					detalle[index].tecnico
				];
				
				data.push(element);
			}
			var index = 0;
			//console.log(index);
			
			
			recursiva(query2,data,index,function () {
				next();
				//res.json({data :'c:'});
			},io,req.body);
		
		});
	}
}

function recursiva (query,data,index,callback,io,body) {

	connect.query(query,data[index],function (rows) {
//console.log(data[index][1]);
	
		//console.log(body.faturaDetalle[index]);
		//console.log(servicioTecnico[i]);
		//aasdf;
		if(body.faturaDetalle[index].tecnico){

			console.log('emit');
			var ioData = {
				'serie' : body.serie,
				'numero' : body.numero,
				'paciente':body.paciente,
				'servicio' : body.faturaDetalle[index]
			}
			//console.log(io);
			io.sockets.emit('nuevoServicio',ioData);
		}
	

		if(index+1 < data.length){
			index++;
			
			recursiva(query,data,index,callback,io,body);
		}else{
			callback();
		}
	});
}

exports.correlactivo = function (req,res) {
	var query = "CALL sp_sel_resolucion_fac_serie_numero()";//"SELECT numero,serie FROM factura";
	connect.query(query,undefined, function (row) {
		console.log(row);
		res.json(row[0]);
	})

}

exports.detalleServicio = function (callback) {
	
		

		
		
		//var resp = [];
		//console.log(servicioTecnico);
		var query = "select f1.serie, f1.numero,f1.nit, f1.direccion,f1.fecha,f1.monto,f1.paciente,f1.formaPago,f2.cantidad,f2.idFacturaDetalle,f2.precio,f1.edad,f2.numeroserial,f2.nombre as nombreServicio from factura f1, facturadetalle f2 where f2.estado = false and f1.idFactura = f2.idFactura and f2.tecnico = 1";
		// function recursiva (index,length) {
		// 	//console.log(servicioTecnico[index-1].dato);
		// 	connect.query(query,parseInt(servicioTecnico[index-1].dato),function (rows) {
		// 		//console.log(resp.length);
		// 		//if(callback) callback(rows);
		// 		if(index == length){
		// 			//console.log('termino');
		// 			if(callback) callback(resp);
		// 		}else{
		// 			index++;
		// 			resp = resp.concat(rows);
		// 			recursiva(index,length);
		// 		}
		// 	});	
		// }
		// recursiva(1,length);
		connect.query(query,undefined,function (row) {
			if(callback) callback(row);
		});
		


	
}

exports.cambiarEstado =function (io) {
	return function (req,res) {
		var  query ="UPDATE facturadetalle SET estado = true WHERE idFacturaDetalle=? ";
		connect.query(query,req.body.idFacturaDetalle,function (row) {
			query = "select f1.serie, f1.numero,f1.nit, f1.direccion,f1.fecha,f1.monto,f1.paciente,f1.formaPago,f2.cantidad,f2.idFacturaDetalle,f2.precio,f2.numeroserial,f2.nombre as nombreServicio from factura f1, facturadetalle f2 where f2.estado = false and f1.idFactura = f2.idFactura";
			connect.query(query,undefined,function (rows) {
				io.sockets.emit('servicios',rows);
				res.json({});	
			});
		});
	}
}