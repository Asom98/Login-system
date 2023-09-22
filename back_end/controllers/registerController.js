const bcrypt = require('bcrypt')
const userModel = require("../models/User")

const handleNewUser = async (req, res)=>{
    const {username, password, email} = req.body
    if(!username || !password) return res.status(400).json({'message': ' Usernmae and password are required.'})
    console.log(username)

    const existingUser = await userModel.findOne({username : username}).exec()
    if(existingUser) return res.sendStatus(409)

    try{
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = await userModel.create({
            username,
            password: hashedPassword,
            email
        })
        
        res.status(201).json({'success' :  `New user ${username} created`})


    }catch(err){
        res.status(500).json({"message": err.message})
    }
}

module.exports = {handleNewUser}


