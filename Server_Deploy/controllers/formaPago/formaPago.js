var express = require('express');
var controller = require('./formaPago.controller');

var router = express.Router();

router.get('/', controller.getAll);
router.post('/',controller.add);
router.delete('/',controller.delete);
router.put('/', controller.update);
module.exports = router;
