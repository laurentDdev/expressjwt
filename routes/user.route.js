const userRoute = require("express").Router()
const userController = require("../controllers/user.controller")
const authorized = require("../middleware/authorized.middleware");

userRoute.get("/all",authorized,userController.getAll)
userRoute.post("/register",userController.register)
userRoute.post("/login",userController.login)
userRoute.post("/disconnect",userController.disconnect)
userRoute.get("/:id/detail",authorized,userController.getById)

module.exports = userRoute