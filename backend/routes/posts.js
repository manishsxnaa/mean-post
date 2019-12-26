const express = require("express");

const Post = require("../models/post");

const router = express.Router();

router.post("", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save().then(createdPost => {
    res.status(201).json({
      message: "Post added successfully",
      postId: createdPost._id
    });
  });
});

router.put("/:id", (req, res, next) => {
  console.log("dddd");

  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
    vote: req.body.vote
  });
  Post.updateOne({ _id: req.params.id }, post).then(result => {

      res.status(200).json({ message: "Update successful!" });

  });
});

router.put("/vote/:id", (req, res, next) => {

  const post = {
    $inc: { vote: req.body.type == 'up'? 1: -1 }
  };
  Post.updateOne({ _id: req.params.id }, post).then(result => {
    res.status(200).json({ message: "Update successful!" });
  }).catch(e =>{
    res.status(401).json({ message: "Not Update !" });
  });
});


router.get("", (req, res, next) => {
  Post.find().then(documents => {
    res.status(200).json({
      message: "Posts fetched successfully!",
      posts: documents
    });
  });
});

router.get("/:id", (req, res, next) => {
  Post.findById(req.params.id).then(post => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "Post not found!" });
    }
  });
});

router.delete("/:id", (req, res, next) => {
  Post.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: "Post deleted!" });
  });
});

module.exports = router;
