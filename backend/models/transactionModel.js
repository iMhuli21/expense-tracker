const mongoose = require("mongoose")

const transactionModel =  mongoose.Schema({
    cost:{
        type: String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    transactionType:{
        type:String,
        required:true
    },
    user:{
        refs:"Users",
        type:String,
        required:true
    }
})


module.exports = mongoose.model("Transactions", transactionModel)