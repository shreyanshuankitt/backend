const User = require("../models/user");
const { check, validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");

exports.signup = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err: "Not updated in db",
      });
    }
    res.json(user);
  });
};

exports.signin = (req, res) => {
  const errors = validationResult(req);
  const { email, password } = req.body;

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  User.findOne({ email }, (err, user) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    if (!user.autheticate(password)) {
      return res.status(401).json({
        error: "wrong password",
      });
    }
    console.log("OK");
    //CREATE TOKEN
    const token = jwt.sign({ _id: user._id }, process.env.SECRET);

    //PUT TOKEN IN COOKIE
    res.cookie("token", token, { expire: new Date() + 999 });

    //SEND RESPONSE TO FRONT END
    const { _id, name, email, role } = user;
    return res.json({ token, user: { _id, name, email, role, password } });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "User signout",
  });
};

//protected routes
exports.isSignedIn = expressJwt({
  secret: process.env.SECRET,
  userProperty: "auth",
});

//custom middleware
exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!checker) {
    return res.status(403).json({
      error: "Access Denined",
      chk: checker,
      data: req.profile,
      data1: req.auth,
      data2: req.profile._id,
      data3: req.auth._id,
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role == 0) {
    return res.status(403).json({
      error: "Access Denined you are not Admin",
    });
  }

  next();
};
