/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */

const userModel = require("../models/User")

const handleLogout = async(req, res) =>{
    const cookies = req.cookies
    if(!cookies?.jwt) return res.status(400)
    console.log(cookies.jwt)
    const refreshToken = cookies.jwt
    
    //check refreshToken
    const foundUser = await userModel.findOne({refreshToken}).exec()//find refreshToken to db
    if(!foundUser) {
        res.clearCookie("jwt", {httpOnly: true, sameSite: "None", secure: true})
        return res.sendStatus(204)
    } 

    //Delete refreshToken in db
    //const otherUsers = await userModel.findOne(!{refreshToken: refreshToken})
    //const currentUser = await userModel.findOne(!{refreshToken: refreshToken}) //find the token and replace it with empty string
    foundUser.refreshToken = ""
    const result = await foundUser.save()
    console.log(result)

     res.clearCookie("jwt", {httpOnly: true, sameSite: "None", secure: true})//clear the cookie
     res.sendStatus(204)
}

module.exports = {handleLogout}