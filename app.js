var express = require("express");

var app = express();

app.use(express.static("./public"));

app.listen(80);

console.log("express app running on port 80");

module.exports = app;