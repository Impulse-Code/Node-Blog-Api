const express = require('express');
const User =require('../models/User');
const router =express.Router();
const bcrypt = require('bcrypt');
const Post = require('../models/Post');


// UPDATE USER
router.put('/:id',async (req,res)=>{
    if (req.body.userId === req.params.id){
        if(req.body.password){
            try{
            const salt = await bcrypt.genSalt(10);
            req.body.password =await bcrypt.hash(req.body.password,salt);
            }catch(error){
                return res.status(500).json('An error occurred user password could not be updated')
            };
        }
        try{
            const updatedUser = await User.findByIdAndUpdate(req.params.id,{
                $set:req.body,},
                {
                    new:true
                });
            res.status(200).json({'User has been updated successfully':updatedUser});

        }catch(err){
            return res.status(500).json(err)
        }
    }else{
        res.status(401).json('YOU can only update your account')
    }
});

// DELETE USER
router.delete('/:id',async (req,res)=>{
    if(req.body.userId === req.params.id){
        try{
            // find user to delete using id
            const user = await User.findById(req.params.id);
            try{
                // delete all posts related to user
                await Post.deleteMany({username: user.username})
                // delete found user
                await user.findByIdAndDelete(req.params.id);
                // return response to user
                res.status(200).json(`Account of user ${user.username} has been deleted`);
            }catch(error){
                return res.status(500).json(error);
            }
        }catch(err){
            res.status(404).json('User not found');
        }
    }else{
        return res.status(403).json('You can only delete your account');
    }

});

// GET USER
router.get('/:id',async(req,res) => {
    try{
        const user = await User.findById(req.params.id);
        const {password,...others} =user._doc;
        res.status(200).json(others)
    }catch(err){
        res.status(500).json(err)
    }
});

module.exports =router; 