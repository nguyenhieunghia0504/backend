var express = require('express')
var router = express.Router();

const controller = require('../Controller/test.controller')

router.get("/test1",controller.test)
module.exports = router