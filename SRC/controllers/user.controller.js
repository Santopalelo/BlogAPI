const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const hashPassword = require("../utilities/bcrypt")

const registerUser = async (req, res, next)=>{
    try {
        
        const {email, password, name} = req.body

        const existingUser = await userModel.findOne({email})
        if(existingUser){
            return res.status(400).json({message: "user already exists"})
        }
        const hashed = await hashPassword(password)
    
        const user = new userModel({
            email: email,
            password: hashed,
            name: name
        })
    
        await user.save()
    
        return res.status(200).json({message: "user has been registered successfully"})
    } catch (error) {
        next(error)
    }
}

const loginUser = async (req, res, next)=>{
    try {
        const {email, password} = req.body
    const user = await userModel.findOne({email})

    if(!user){
        return res.status(404).json({message: "user does not exist"})
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch) {
        return res.status(400).json({message: "invalid credentials"})
    }

    const token = jwt.sign(
        {userId : user._id},
        process.env.JWT_SECRET,
        {expiresIn: "7d"}
    )

    const resUser = {
        name: user.name,
        email: user.email,
        id: user._id
    }

    return res.status(200).json({message: "user has been logged in successfully", user: resUser, token})
    } catch (error) {
        next(error) 
    }
}

module.exports = {
    registerUser,
    loginUser
}