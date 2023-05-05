const jwt = require("jsonwebtoken")


const authorized = (req,res,next) => {
    const token = req.headers["authorization"].split(" ")[1]

    jwt.verify(token,process.env.JWT_SECRET,(err,payload) => {
        if (err) {
            return res.sendStatus(401)
        }
        next()
    })
}


module.exports = authorized