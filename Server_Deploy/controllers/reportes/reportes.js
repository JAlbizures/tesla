var express = require('express');
var controller = require('./reportes.controller');

var router = express.Router();

//router.get('/', controller.getAll);
router.get('/', controller.generarReporte);
router.get('/servicios/pdf', controller.generarSericiosPDF);
router.get('/facturas/pdf', controller.generarFacturasPDF);
router.get('/serviciosNoFacturados/pdf', controller.generarServiciosNoFacturadosPDF);
//router.post('/pdf', controller.generarPDF);
//router.delete('/:id', controller.delete);
//router.put('/', controller.update);

module.exports = router;