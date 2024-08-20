const express = require("express");
const app = express();
const airportsRoute = require("./airports");
const flightSchedulesRoute = require("./flightSchedules");
const bookingRoute = require("./booking");

app.use("/airports", airportsRoute);
app.use("/flight-schedules", flightSchedulesRoute);
app.use("/booking", bookingRoute);

module.exports = app;