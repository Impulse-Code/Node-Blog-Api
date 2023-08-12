const express = require('express');
const User =require('../models/User');
const router =express.Router();
const Post = require('../models/Post');


// CREATE NEW POST
router.post('/',async (req,res)=>{
    try{
        // create new post
        const newPost = new Post({
            title:req.body.title,
            username:req.body.username,
            description:req.body.description,
            photo:req.body.photo,
            category:req.body.category
    
        })

        // save post to db
        const post = await newPost.save();
        res.status(200).json(post);
    }catch(err){
        res.status(500).json('An error occurred,Your Post could not be saved to the db',err);
    }
   
});

// UPDATE POST
router.put('/:id',async (req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(post.username === req.body.username){
            try{
                const updatedPost =await Post.findByIdAndUpdate(req.params.id,{
                    $set:req.body
                },{new:true});
                res.status(200).json(updatedPost);
            }
            catch(err){
                res.status(500).json(err);
            }
        }else{
            res.status(401).json('You can only update your post')
        }
      
    }catch(err){
        res.status(500).json('Error Post could not be found',err);
    }
});

// DELETE POST
router.put('/:id',async (req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(post.username === req.body.username){
            try{
                await post.delete();
                res.status(200).json(`${Post.title} has been deleted....`);
            }
            catch(err){
                res.status(500).json(err);
            }
        }else{
            res.status(401).json('You can only update your post')
        }
      
    }catch(err){
        res.status(500).json('Error Post could not be found',err);
    }
});

// get post

router.get('/:id',async(req,res) => {
    try{
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    }catch(err){
        res.status(500).json(err);
    }
});

// GET ALL POSTS
router.get('/',async(req,res) => {
    const username = req.query.user;
    const catName = req.query.cat;
    try{
        let posts;
        if (username){
            posts = await Post.find({username});
        }else if (catName){
            posts= await Post.find({categories:{
                $in:[catName]
            }});
        }else{
            posts = await Post.find();
        }
        res.status(200).json(posts);
    }catch(err){
        res.status(500).json(err);
    }
});


module.exports = router;