

module.exports = function(app,io) {
	

	app.use('/usuarios', require('./controllers/usuarios/usuarios'));
	app.use('/servicios', require('./controllers/servicios/servicios'));
	app.use('/facturas', require('./controllers/facturas/facturas')(io));
	app.use('/config', require('./controllers/config/config'));
	app.use('/pulmon',require('./controllers/pulmon/pulmon')(io));
	app.use('/formaPago',require('./controllers/formaPago/formaPago'));
	app.use('/reportes',require('./controllers/reportes/reportes'));
	app.use('/pruebas',require('./controllers/pruebas/pruebas'));
}