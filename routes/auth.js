var express = require("express");
var router = express();
const { check, validationResult } = require("express-validator");
const {
  signout,
  signup,
  signin,
  isSignedIn,
} = require("../controllers/auth.js");
router.get("/signout", signout);

router.post(
  "/signup",
  [
    check("name")
      .isLength({ min: 3 })
      .withMessage("must be at least 3 chars long"),
    check("email").isEmail().withMessage("must be at least 3 chars long"),
    check("password")
      .isLength({ min: 5 })
      .withMessage("must be at least 3 chars long"),
  ],
  signup
);

router.post(
  "/signin",
  [
    check("email").isEmail().withMessage("you must be at least 3 chars long"),
    check("password").isLength({ min: 1 }).withMessage("Password is required"),
  ],
  signin
);

router.get("/testroute", isSignedIn, (req, res) => {
  res.json(req.auth);
});

module.exports = router;
