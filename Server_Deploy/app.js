

var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var app = require('express')();

//var server = require('http').createServer(app);
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());
app.get('/',function(req,res){
	res.json([]);
});
require('./routes')(app,io);
var port = 8080
server.listen(port,'0.0.0.0', function() {
  console.log('%s listening at %s', '0.0.0.0', port);
});

io.on('connection', function (socket) {
	
	require('./controllers/facturas/facturas.controller').detalleServicio(function (rows) {
		console.log('connection',rows);
		socket.emit('servicios',rows);	
	});
	socket.on('getServicios',function (data) {
		require('./controllers/facturas/facturas.controller').detalleServicio(function (rows) {
			console.log('getServicios',rows);
			socket.emit('servicios',rows);	
		});
	})		
});

// io.on('connection', function (socket) {
//   socket.emit('news', { hello: 'world' });
//   socket.on('my other event', function (data) {
//     console.log(data);
//   });
// });