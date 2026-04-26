const jwt = require("jsonwebtoken")
const userModel = require("../models/user.model")
const requireAuth = async (req, res, next) => {
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({error: "Access denied, no Token provided"})
    }
    const token = authHeader.replace("Bearer ", "")

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        
        const user = await userModel.findById(payload.userId)
        if(!user){
            return res.status(404).json({error: "User not found"})
        }

        req.user = user
        next()
    } catch (error) {
        res.status(401).json({error: "Invalid or expired token"})     
    }
}

module.exports = requireAuth