const userModel = require("../models/user.model")
const joi = require("joi")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const registerUser = async (req, res, next)=>{

    const registerSchema = joi.object({
        name: joi.string().min(2).required(),
        email: joi.string().email().required(),
        password: joi.string().required()
    })
    
    const {error} = registerSchema.validate(req.body)
    if(error){
        return res.status(400).json({message: error.details[0].message})
    }
    try {
        
        const {email, password, name} = req.body

        const existingUser = await userModel.findOne({email})
        if(existingUser){
            return res.status(400).json({message: "user already exists"})
        }
    
        const salt =await bcrypt.genSalt(12)
        const hashed = await bcrypt.hash(password, salt)
    
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
    const loginSchema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().required()
    })

    const {error} = loginSchema.validate(req.body)
    if(error){
        return res.status(400).json({message: error.details[0].message})
    }

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