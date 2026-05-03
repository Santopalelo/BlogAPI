const express = require("express");
const multer = require("multer");
const upload = require("../middlewares/upload")
const { registerUser, loginUser } = require("../controllers/user.controller");
const { validateRegisterUser, validateLoginUser } = require("../validator/user.validator");
const router = express.Router();

router.post("/upload/avatar", upload.array("avatar", 5), (req, res) =>{
    const files = req.files;
    files.forEach(file =>{
        console.log(file.path,file.filename)
    }   )
    
    return res.send("Avatar uploaded successfully", { files: req.files })
})
router.post("/sign-up",validateRegisterUser, registerUser)
router.post("/login",validateLoginUser, loginUser)

module.exports = router