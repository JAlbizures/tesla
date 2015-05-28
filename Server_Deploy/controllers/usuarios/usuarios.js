var express = require('express');
var controller = require('./usuarios.controller');

var router = express.Router();

router.get('/', controller.getAll);
router.post('/crear', controller.add);
router.post('/auth', controller.auth);
router.delete('/:id', controller.delete);
router.put('/', controller.update);

module.exports = router;