const userRoute = require("express").Router()
const userController = require("../controllers/user.controller")

userRoute.get("/all",userController.getAll)
userRoute.post("/register",userController.register)
userRoute.post("/login",userController.login)

module.exports = userRoute