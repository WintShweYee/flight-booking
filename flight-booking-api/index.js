const express = require("express");
const cors = require("cors");
const routes = require("./routes/index");
const moment = require("moment-timezone");

require("dotenv").config();
moment.tz.setDefault("UTC");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", routes);

const on_port = process.env.PORT || 3000;

app.listen(on_port, () => {
    console.log("server running at :" + on_port);
})