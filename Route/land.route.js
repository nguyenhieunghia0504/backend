var express = require('express')
var router = express.Router()
var controller = require('../Controller/land.controller')

router.get("/getFullLand",controller.getFullLand)
router.post("/getLandDetails",controller.getLandDetails)
router.post("/getHomeDetails",controller.getHomeDetails)
router.post("/addSchedule",controller.addSchedule)
router.post("/getScheduleByIdUser",controller.getScheduleByIdUser)
module.exports = router