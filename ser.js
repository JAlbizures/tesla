var ubicacion = 'C:\\\Version3\\Server_Deploy\\app.js';

var Service = require('node-windows').Service;

// Create a new service object
var svc = new Service({
	name:'Tesla',
	description: 'server de tesla',
	abortOnError:true,
  script: ubicacion
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install',function(){
  svc.start();
});

svc.install();

//######################################################################

// var Service = require('node-windows').Service;

// // Create a new service object
// var svc = new Service({
//   name:'Tesla',
//   script: ubicacion
// });

// // Listen for the "uninstall" event so we know when it's done.
// svc.on('uninstall',function(){
//   console.log('Uninstall complete.');
//   console.log('The service exists: ',svc.exists);
// });

// // Uninstall the service.
// svc.uninstall();


//######################################################################
// var EventLogger = require('node-windows').EventLogger;

// var log = new EventLogger('Hello World');

// log.info('Basic information.');
// log.warn('Watch out!');
// log.error('Something went wrong.');