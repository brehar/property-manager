'use strict';

var express = require('express');
var router = express.Router();

router.use('/tenants', require('./tenants'));
router.use('/properties', require('./properties'));

module.exports = router;