const express = require("express");
require("dotenv").config();
var bodyParser = require("body-parser");
const passport = require('passport');
const cookieSession = require('cookie-session');
require('./src/config/passport1');
const userRouter = require("./src/routes/user.routes");
const productRouter = require("./src/routes/product.routes");
const app = express();

app.use(cookieSession({
    name: 'google-auth-session',
    keys: ['key1', 'key2']
}));
app.use(passport.initialize());
app.use(passport.session());
// middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.use(productRouter);
app.use(userRouter);


module.exports = app;