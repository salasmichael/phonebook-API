const express = require('express');
const userController = require("../controllers/user.controller");
const { validarJWT } = require('../middlewares/validate-jwt');
const app = express();

app.get("/idAdmin/:idAdmin",
        validarJWT,
        userController.getUsers
    );

app.get("/:idUser",
        validarJWT,
        userController.getUserById);

app.get("/idAdmin/:idAdmin/query/:query",
        validarJWT,
        userController.searchUser);
        
app.post("/",
        validarJWT,
        userController.createUser);

app.put("/:idUser",
        validarJWT,
        userController.editUser);

app.delete("/:idUser",
        validarJWT,
        userController.deleteUser);

module.exports = app;
