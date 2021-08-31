const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const JwtAuth = passport.authenticate("jwt", { session: false });
//Models
const Post = require("../../models/Post");
const User = require("../../models/User");

//Validation
const validatePostInput = require("../../validation/post");

//@route GET api/posts/test
//@desc Tests post route
//@access Public
router.get("/test", (req, res) => {
  res.json({ msg: "Posts works" });
});

//@route GET api/posts/
//@desc Get all post
//@access Public
router.get("/", (req, res) => {
  Post.find().then((post) => res.json(post));
});

//@route POST api/posts/
//@desc Create post
//@access private
router.post("/", JwtAuth, (req, res) => {
  const { errors, isValid } = validatePostInput(req.body);

  //Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const newPost = new Post({
    text: req.body.text,
    name: req.body.name,
    avatar: req.body.avatar,
    user: req.user.id,
  });

  newPost.save().then((post) => res.json(post));
});

module.exports = router;
