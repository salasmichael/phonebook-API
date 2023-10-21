const express = require('express');
const authController = require("../controllers/auth.controller");
const app = express();

app.post("/login",authController.login);
app.post("/register",authController.createUser);

module.exports = app;
