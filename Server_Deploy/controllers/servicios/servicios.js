var express = require('express');
var controller = require('./servicios.controller');

var router = express.Router();

router.get('/', controller.getAll);
router.post('/crear', controller.add);
router.delete('/:id', controller.delete);
router.put('/', controller.update);
router.get('/precios', controller.preciosByservicio);
router.get('/precios/all',controller.preciosAll);
router.put('/precios', controller.changePrecio);
module.exports = router;