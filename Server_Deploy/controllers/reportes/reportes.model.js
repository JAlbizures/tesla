var connect = require('../../utils/connect');

exports.generarReporteFactura = function (data, callback) {
	var query = 'call sp_sel_reporte_facturas(?, ?)';	
	connect.query(query,data,function (rows) {

		//console.log(rows);
		if(callback) callback(rows);
	});
}

exports.generarReporteServicios = function (callback) {
	var query = "call sp_sel_reporte_servicios()"
	//var query = "SELECT `nombre`,`idServicio` , `numeroserial`, `tipo` FROM `servicio`";
	connect.query(query, undefined, function (rows) {
		
		//console.log(rows);
		if(callback) callback(rows);
	});
}
exports.generarReporteServiciosNoFacturados = function (callback) {
	//var query = "SELECT s.nombre , f.precio,f.nombre, f.cantidad , f.numeroserial FROM factura fa, facturadetalle f , servicio s, formapago fp where f.idServicio = s.idServicio and fa.idFactura = f.idFactura and fp.idFormaPago = fa.formaPago and fa.formaPago <> 'Contado'";
	var query = "call sp_sel_reporte_serv_no_fact()";
	connect.query(query, undefined, function (rows) {

		
		//console.log(rows);
		if(callback) callback(rows);
	});
}