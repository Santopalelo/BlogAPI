const joi = require("joi");

const validateRegisterUser = (req, res, next)=>{

    const registerSchema = joi.object({
            name: joi.string().min(2).required(),
            email: joi.string().email().required(),
            password: joi.string().required()
        })
        
        const {error, value} = registerSchema.validate(req.body)
        if(error){
            return res.status(400).json({message: error.details[0].message})
        }
        next()
}

const validateLoginUser = (req, res, next)=>{
     const loginSchema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().required()
    })

    const {error} = loginSchema.validate(req.body)
    if(error){
        return res.status(400).json({message: error.details[0].message})
    }
next()
}

module.exports = {
    validateRegisterUser,
    validateLoginUser
}