var express = require('express');
var controller = require('./pruebas.controller');

var router = express.Router();


var router = express.Router();

router.get('/prueba', controller.prueba);
// router.post('/',controller.add);
// router.delete('/',controller.delete);
// router.put('/', controller.update);
module.exports = router;