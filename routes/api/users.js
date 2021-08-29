const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/key").secretOrKey;
const passport = require("passport");
const JwtAuth = passport.authenticate("jwt", { session: false });

//Load input validation
const validateRegisterInput = require("../../validation/register");

//Load user models
const User = require("../../models/User");

//@route GET api/users/test
//@desc Tests users route
//@access Public
router.get("/test", (req, res) => {
  res.json({ msg: "User works" });
});

//@route GET api/users/register
//@desc Register user
//@access Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      errors.email = "Email already exist";
      return res.status(400).json({ errors });
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", //size
        r: "pg", //rating
        d: "mm", //Default
      });
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password,
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => {
              res.json(user);
            })
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

//@route GET api/users/login
//@desc Login user / Returning JWT Token
//@access Public

router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  //Find user by email
  User.findOne({ email }).then((user) => {
    //Check for user
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    //Check for password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        //User matched

        const payload = {
          id: user.id,
          email: user.email,
          name: user.name,
          avatar: user.avatar,
        }; //Create jwt payload

        //Sign token
        jwt.sign(payload, keys, { expiresIn: 3600 }, (err, token) => {
          res.json({ success: true, token: "Bearer " + token });
        });
      } else {
        return res.status(400).send({ error: "Password incorrect" });
      }
    });
  });
});

//@route GET api/users/current
//@desc Return current user
//@access Private
router.get("/current", JwtAuth, (req, res) => {
  res.json({
    msg: "success",
    id: req.user.id,
    name: req.user.name,
    email: req.user.email,
    avatar: req.user.email,
  });
});

module.exports = router;
