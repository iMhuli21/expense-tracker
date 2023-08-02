const userModel = require("../models/userModel");
const jwt       = require("jsonwebtoken")

//Generates a token
const generateToken = (id)=> {
  return jwt.sign({id}, process.env.SECRET,{ expiresIn: "3d"})
}

//create user
//post
//public
const createUser = async (req, res) => {
  const { email, name, password } = req.body;

  try {
    const user = await userModel.registerUser(name, email, password)

    res.status(201).json({token: generateToken(user._id)})

  } catch (error) {

    res.status(400).json({ msg: error.message })
  }
}

//login the user
//post
//public
const signInUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.loginUser(email, password)

    res.status(201).json({token: generateToken(user._id), email: email})

  } catch (error) {

    res.status(400).json({ msg: error.message })
  }
}


module.exports = {
    createUser,
    signInUser
}