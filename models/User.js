const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },

    location:{
        type:String,
        default:'unknown',
    },
    
    email:{
        type:String,
        required:true,
        unique:true
    },

    password:{
        type:String,
        required:true,
        min:6
    },

    profilePicture:{
        type:String,
        default:'',
    }

}, 
    {timestamps:true}
);

module.exports = mongoose.model('User',userSchema);