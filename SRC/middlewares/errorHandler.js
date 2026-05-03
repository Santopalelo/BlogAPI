const multer = require("multer")
const errorHandler = (err, req, res, next) =>{
console.error(err.message)
const status = err.status || 500

if(err instanceof multer.MulterError){
    return res.status(400).json({error: err.message})
}
res.status(status).json({error: err.message})
}
module.exports = errorHandler