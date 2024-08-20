const express = require("express");
const router = express.Router();
const airportsCtrl= require("../controllers/airports");

router.get("/", airportsCtrl.getAllAirports);

module.exports = router;