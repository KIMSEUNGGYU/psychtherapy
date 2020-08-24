require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const router = require("./routes/index");
const app = express();

app.use(logger("dev"));
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: false }));
app.use(cookieParser());

app.use("/", router);

module.exports = app;
