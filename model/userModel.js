const mongoose = require("mongoose");


const userSchema = mongoose.Schema({
    first_name:{type:String,require:true},
    last_name:{type:String,require:true},
    email:{type:String,require:true},
    password:{type:String,require:true},
    
},{
    versionKey:false
})

const UserModel = mongoose.model("user",userSchema)

module.exports = {UserModel}

