const mongoose = require("mongoose")
const bcrypt   = require("bcrypt")

//User Schema
const user = mongoose.Schema({
    name:{
        type: String, 
        required: true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
}, {timestamps : true})

//register user
user.statics.registerUser = async function(name, email, password){

    //validate the user
    if(!email || !password || !name){
        throw new Error("All fields are required")
    }

    //Check if it is a valid email
    if(!email.match(/([\W\w]+@[\w]{4,5}\.[\w]{3})/)){
        throw new Error("Invalid Email")
    }

    //Check if the password is strong enough
    if(!password.match(/([\W\w]{8,24})/)){
        throw new Error("Password must be stronger")
    }

    //Hash the password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt);

    //Create the user
    const user = await this.create({
        name, 
        email,
        password: hashedPassword
        
    })

    if(!user){
        throw new Error("Error creating account, try again")
    }else{
        return user
    }
}

//login user
user.statics.loginUser = async function(email, password){

    //validate the user
    if(!email || !password ){
        throw new Error("All fields are required")
    }
    //Check if the user exists
    const user = await this.findOne({email})

    if(!user){
        throw new Error("Invalid Email")
    }

    //Compare the passwords
    const match = await bcrypt.compare(password, user.password)

    if(!match){
        throw new Error("Incorrect Password")
    }
    else{
        return user
    }

}

module.exports = mongoose.model("Users", user)