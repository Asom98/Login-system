const express = require("express")
const app = express()
const path = require("path")
const cors = require("cors")
const mongoose = require("mongoose")
require("dotenv").config()
const connectDb = require("./config/dbConn")
const verifyJwt = require("./middleware/verifyJWT")
const cookieParser = require("cookie-parser")


const register = require("./routes/register")
const auth = require("./routes/auth")
const refresh = require("./routes/refresh")
const logout = require("./routes/logout")

const allowedOrigins = ['http://localhost:3000', 'http://localhost:3500']


connectDb.connectDb()
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true
  })
)
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
//app.use("/", express.static(path.join(__dirname, "/public")))


app.use("/register", register)
app.use("/auth", auth)
app.use("/refresh", refresh)
app.use("/logout", logout)


app.use(verifyJwt)


mongoose.connection.once("open", ()=>{
  console.log("DB connected!")
  app.listen(process.env.PORT,console.log("Server listning to port: ", process.env.PORT))
})


