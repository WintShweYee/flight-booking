const express = require("express");
const router = express.Router();
const flightScheduleCtrl= require("../controllers/flightSchedules");
const { getFlightSchedulesValidator } = require("../middlewares/validation");

router.get("/", getFlightSchedulesValidator, flightScheduleCtrl.getFlightSchedules);

module.exports = router;