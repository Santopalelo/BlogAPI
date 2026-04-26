const express = require("express");
const { registerUser, loginUser } = require("../controllers/user.controller");
const { validateRegisterUser, validateLoginUser } = require("../validator/user.validator");
const router = express.Router();

router.post("/sign-up",validateRegisterUser, registerUser)
router.post("/login",validateLoginUser, loginUser)

module.exports = router