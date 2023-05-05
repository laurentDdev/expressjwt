const dotenv = require("dotenv").config()
const express = require("express")
const router = require("./routes/index")
const cors = require("cors")




const app = express()
app.use(cors({
    origin:"http://localhost:5173",
    exposedHeaders:"authorization"
}))
app.use(express.json())
app.use("/api",router)


app.listen(process.env.PORT,() => {
    console.log(`Server has been started on port ${process.env.PORT}`)
})