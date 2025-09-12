const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");

router.post(
  "/",
  [
    body("username").notEmpty().withMessage("Username is required"),
    body("email").isEmail().withMessage("Invalid email address"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    body("confirmPassword")
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Passwords do not match");
        }
        return true;
      }),
  ],
    (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render("register", {
        errors: errors.array(),
        username: req.body.username,
        email: req.body.email
      });
    }
    const { username, email, password } = req.body;

    console.log("Username:", username);
    console.log("Email:", email);
    console.log("Password:", password);
    res.redirect("/");
}
);
    
module.exports = router;

