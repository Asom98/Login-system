const jwt = require('jsonwebtoken')
require("dotenv").config()

const verfiyJwt = (req, res, next) =>{
    const authHeader = req.headers["authorization"]
    if (!authHeader) return res.sendStatus(401)
    console.log(authHeader) //Bearer token
    const token = authHeader.split(" ")[1]
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN,
        (err, decoded) =>{
            if(err) return res.sendStatus(403)
            req.username = decoded.username
            next()
        }
    )
}

module.exports = verfiyJwt