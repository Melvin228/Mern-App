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

//@route POST api/posts/like/:id
//@desc post by a like by id
//@access private

router.post("/like/:id", JwtAuth, (req, res) => {
  Profile.findOne({ user: req.user.id }).then((profile) =>
    Post.findById(req.params.id)
      .then((post) => {
        if (
          post.likes.filter((like) => like.user.toString() === req.user.id)
            .length > 0
        ) {
          return res
            .status(400)
            .json({ alreadyliked: "User already liked this post" });
        }
        //Add user id to likes array
        post.likes.unshift({ user: req.user.id });

        post.save().then((post) => res.json(post));
      })
      .catch((err) => res.status(404).json({ postnotfound: "No post found" }))
  );
});

//@route POST api/posts/unlike/:id
//@desc unlike post by id
//@access private

router.post("/unlike/:id", JwtAuth, (req, res) => {
  Profile.findOne({ user: req.user.id }).then((profile) =>
    Post.findById(req.params.id)
      .then((post) => {
        if (
          post.likes.filter((like) => like.user.toString() === req.user.id)
            .length === 0
        ) {
          return res
            .status(400)
            .json({ notliked: "You have not yet liked this post" });
        }
        //Get the remove index
        const removeIndex = post.likes
          .map((item) => item.user.toString())
          .indexOf(req.user.id);

        //Splice out of the array
        post.likes.splice(removeIndex, 1);

        //Save
        post.save().then((post) => res.json(post));
      })
      .catch((err) => res.status(404).json({ postnotfound: "No post found" }))
  );
});

//@route POST api/posts/comment/:id
//@desc Add comment to post
//@access private
router.post("/comment/:id", JwtAuth, (req, res) => {
  const { errors, isValid } = validatePostInput(req.body);

  //Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  Post.findById(req.params.id)
    .then((post) => {
      const newComment = {
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id,
      };

      //Add to comment arrays
      post.comments.unshift(newComment);

      //Save
      post.save().then((post) => res.json(post));
    })
    .catch((err) => res.status(404).json({ postnotfound: " No post found" }));
});

//@route DELETE api/posts/comment/:id/:comment_id
//@desc Remove comment from post
//@access private
router.delete("/comment/:id/:comment_id", JwtAuth, (req, res) => {
  Post.findById(req.params.id)
    .then((post) => {
      //Check to see if the comment exist
      if (
        post.comments.filter(
          (comment) => comment._id.toString() === req.params.comment_id
        ).length === 0
      ) {
        return res
          .status(404)
          .json({ commentnotexist: "Comment does not exist" });
      }
      //Get remove index
      const removeIndex = post.comments
        .map((item) => item._id.toString())
        .indexOf(req.params.comment_id);

      //Splice comment out of array
      post.comments.splice(removeIndex, 1);

      post.save().then((post) => res.json(post));
    })
    .catch((err) => res.status(404).json({ postnotfound: " No post found" }));
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
