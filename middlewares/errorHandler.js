const errorHandler = (err, req, res, nex) =>{
console.error(err.message)
const status = err.status || 500
res.status(status).json({error: err.message})
}
module.exports = errorHandler