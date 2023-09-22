/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */

const bcrypt = require('bcrypt')
const userModel = require("../models/User")
const jwt = require('jsonwebtoken')


const handleLogin = async(req, res) =>{
    const user = {username, password} = req.body
    if(!username || !password) return res.status(400).json({'message': ' Usernmae and password are required.'})
    
    //check username
    const foundUser = await userModel.findOne({username})
    if(!foundUser) return res.sendStatus(401) //Unauthorized

    //check password
    const match = await bcrypt.compare(password, foundUser.password)
    if(match){

        const accessToken = jwt.sign(
            {"username" : foundUser.username},
            process.env.ACCESS_TOKEN,
            {expiresIn: "30s"}
        )

        const refreshToken = jwt.sign(
            {"username" : foundUser.username},
            process.env.REFRESH_TOKEN,
            {expiresIn: "1d"}
        )
        //Save refreshToken
        foundUser.refreshToken = refreshToken
        const result = await foundUser.save()
        console.log(result)
        res.cookie("jwt", refreshToken), {httpOnly: true, maxAge: 24 * 60 * 60 * 1000}
        res.json({accessToken})
    }else{
        res.sendStatus(401)
    }
}

module.exports = {handleLogin}