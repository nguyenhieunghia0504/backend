var express = require('express')
var router = express.Router()
var controller = require('../Controller/land.controller')

router.get("/getFullLand",controller.getFullLand)
router.post("/getLandDetails",controller.getLandDetails)
router.post("/addSchedule",controller.addSchedule)
module.exports = router