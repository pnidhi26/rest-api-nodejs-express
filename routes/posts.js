const express = require('express');
const router = express.Router();

const Post = require('../models/Post');



// GET BACK ALL THE POST
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (err) {
        res.status(400).json({ message:err });
    }
});


//SUBMIT A POST
router.post('/', async (req, res) => {
    console.log(req.body);
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });

    try {
        const savedPost = await post.save();
        res.status(200).json(savedPost);
    } catch (err) {
        res.status(400).json({ message: err });
    }

    // post.save()
    //  .then(data => {
    //     res.status(200).json(data);
    //  })
    //  .catch(err => {
    //     res.json({message: err});
    //  });
});


//SPECIFIC POST
router.get('/:postId', async (req, res) => {
    // console.log(req.params.postId);
    try{
        const post = await Post.findById(req.params.postId);
        res.json(post);
    } catch (err) {
        res.json({ message: err });
    }
});


//Delete Post
router.delete('/:postId', async (req, res) => {
    try {
        const removedPost = await Post.remove({ _id: req.params.postId });
        res.status(200).json(removedPost);
    } catch (err) {
        res.json({ message: err });
    }
});


//Update a post
router.patch('/:postId', async (req, res) => {
    try {
        const updatedPost = await Post.updateOne(
            { _id: req.params.postId },
            { $set: { title: req.body.title, description: req.body.description }
        });
        res.status(200).json(updatedPost);
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;