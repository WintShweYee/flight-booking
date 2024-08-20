const express = require("express");
const router = express.Router();
const bookingCtrl= require("../controllers/booking");
const { createBookingValidator } = require("../middlewares/validation");

router.post("/new", createBookingValidator, bookingCtrl.createBooking );

module.exports = router;