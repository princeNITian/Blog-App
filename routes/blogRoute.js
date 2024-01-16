const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const rateLimiter = require('../middleware/rateLimiter');
const corsMiddleware = require('../middleware/corsMiddleware');
const Post = require('../models/Post');
// const User = require('../models/User');

// Route to create a new post
router.post('/create',authMiddleware,rateLimiter, async (req,res) => {
    try{
        const {title, text, image} = req.body;
        const userId = req.user.userId;

        // Ensure that the user exists before creating the post
        if(!userId) {
            return res.status(404).json({ error: "user not found." });
        }

        const newPost = new Post({
            title,
            text,
            image,
            user: userId
        });

        await newPost.save();
        res.status(200).json({ message: "Post created successfully. "});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Public Route for all posts
router.get('/',corsMiddleware, async (req,res) => {
    try {
        // Find Posts
        const posts = await Post.find({});
        res.status(200).json({ posts });
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: "Internal server Error" });
    }
});

// Get all posts by a user
router.get('/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const posts = await Post.find({ user: userId });
        res.status(200).json({ posts })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server Error" })
    }
})

module.exports = router;