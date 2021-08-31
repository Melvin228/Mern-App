const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const JwtAuth = passport.authenticate("jwt", { session: false });
//Models
const Post = require("../../models/Post");
const User = require("../../models/User");
const Profile = require("../../models/Profile");

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
  Post.find()
    .sort({ date: -1 })
    .then((posts) => res.json(posts))
    .catch((err) => res.status(404).json({ nopostsfound: "No posts found" }));
});

//@route GET api/posts/:id
//@desc Get post by id
//@access Public
router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then((post) => res.json(post))
    .catch((err) =>
      res.status(404).json({ nopostfound: "No post found with that id" })
    );
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

//@route delete api/posts/:id
//@desc Delete post by id
//@access private

router.delete("/:id", JwtAuth, (req, res) => {
  Profile.findOne({ user: req.user.id }).then((profile) =>
    Post.findById(req.params.id)
      .then((post) => {
        //Check for post owner
        if (post.user.toSring() !== req.user.id) {
          return res.status(401).json({ notauthorized: "User not authorized" });
        }

        //Delete
        post.remove().then(() => res.json({ success: true }));
      })
      .catch((err) => res.status(404).json({ postnotfound: "No post found" }))
  );
});

module.exports = router;
