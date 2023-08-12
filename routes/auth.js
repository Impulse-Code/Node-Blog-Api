const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User =require('../models/User');

// REGISTER
router.post('/register',async (req,res)=>{
    try{
        // GENERATE A SALT TO USE WITH THE PASSWORD
        const salt =await bcrypt.genSalt(10);
        // GENERATE NEW PASS
        const hashedPass= await bcrypt.hash(req.body.password,salt);

        // create a new user
        const newUser = new User({
            username:req.body.username,
            email:req.body.email,
            password:hashedPass,
        });
        // SAVE USER AND RETURN RESPONSE
        const user =await newUser.save();
        res.status(200).json(user);

    }catch(err){
        res.status(500).json('An error occurred,User could not be saved to db',err);
    }
});

// LOGIN
router.post('/login',async(req,res)=>{
    try{
        // find the user
        const user = await User.findOne({username:req.body.username});
        !user && res.status(400).json('Specified User could not be found');

        const validatePass = await bcrypt.compare(req.body.password, user.password);
        !validatePass && res.status(400).json('Wrong credentials please try again');

        const{password,...others} = user._doc

        res.status(200).json(others);
    }catch(err){
        res.status(500).json('An error occurred',err);
    }
});


modules.exports= router;