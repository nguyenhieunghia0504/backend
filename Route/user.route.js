var express = require('express')
var router = express.Router()

const controller = require('../Controller/user.controller')

router.post("/login",controller.login)
router.post("/register",controller.register);

module.exports = router