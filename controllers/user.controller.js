const userModel = require("../models/user.model")
const sql = require("mssql")
const sqlConfig = require("../database.config")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const userController = {
    getAll:async (req,res) => {
        try {
            await sql.connect(sqlConfig)
            const usersRequest = await userModel.getAll()
            if (usersRequest) {
                res.status(200).json(usersRequest.recordset)
            }
        }catch (e) {
            console.log(e)
            res.sendStatus(403)
        }
    },
    register:async (req,res) => {
        try {
            console.log(req.body)
            const { email, firstname, lastname, password } = req.body
            const hashedPassword = bcrypt.hashSync(password,10)
            await sql.connect(sqlConfig)
            const result = await userModel.create({email,firstname,lastname,hashedPassword})
            if (result) {
                res.status(200).send("Register with success")
            }
        }catch (e) {
            console.log(e)
        }
    },
    login:async (req,res) => {
        try {
            const {email,password} = req.body
            await sql.connect(sqlConfig)
            const userRequest = await userModel.getByMail(email)
            const user = userRequest.recordset[0]
            if (!user) {
               return  res.status(401).send("You dont have an account")
            }
            if (user.jwt) {
                jwt.verify(user.jwt,process.env.JWT_SECRET,(err,payload) => {
                    if (err) {
                        return res.status(401).send("token invalid")
                    }
                    res.status(200).send("token ok")

                })
            }else {
                const isValidPassword = bcrypt.compareSync(password,user.password)
                if (!isValidPassword) {
                    return res.status(401).send("Invalid password")
                }
                const id = user.id
                const payload = {
                    userId:id,
                    email:user.email,
                    pseudo:user.pseudo
                }
                const options = {
                    expiresIn: "1h"
                }
                const token = jwt.sign(payload,process.env.JWT_SECRET,options)
                const jwtUpdate = await userModel.saveJwt({jwt:token, id:id})
                if (jwtUpdate) {

                        res.setHeader("authorization",`Bearer ${token}`)
                        res.status(200).json(token)
                }
            }
        }catch (e) {
            console.log(e)
        }
    }
}


module.exports = userController