const express = require("express");
require("dotenv").config();
var bodyParser = require("body-parser");

const userRouter = require("./src/routes/user.routes");
const productRouter = require("./src/routes/product.routes");
const app = express();

// middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.use(productRouter);
app.use(userRouter);


module.exports = app;