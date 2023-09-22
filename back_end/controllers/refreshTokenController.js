/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */

const userModel = require("../models/User")
const jwt = require('jsonwebtoken')


const handleRefreshToken = async(req, res) =>{
    const cookies = req.cookies
    if(!cookies?.jwt) return res.sendStatus(400)
    console.log(cookies.jwt)

    const refreshToken = cookies.jwt
    
    //check username
    const foundUser = await userModel.findOne({refreshToken}).exec() //find refreshToken
    if(!foundUser) return res.sendStatus(401) //Unauthorized

    //check password
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN,
        (err, decoded) =>{
            if(err || foundUser.username !== decoded.username) return res.sendStatus(403)
            const accessToken = jwt.sign({"username" : decoded.username}, process.env.ACCESS_TOKEN, {expiresIn: "30s"})
            res.json(accessToken)
        }
    )

}

module.exports = {handleRefreshToken}