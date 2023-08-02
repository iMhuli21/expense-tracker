const express      = require("express")
const router       = express.Router()
const {
    createUser,
    signInUser}    = require("../controllers/userController")

//register user
router.post("/register", createUser)

//register user
router.post("/login", signInUser)

module.exports = router

