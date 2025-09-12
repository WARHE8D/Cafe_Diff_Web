const express = require('express');
const router = express.Router();
const { body, validationResult } = require("express-validator");


router.post("/",
    [
        body("username").notEmpty().withMessage("Username is required"),
        body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),
    ],
     (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("register", {
        errors: errors.array(),
        oldInput: req.body.username,
      });
    }
  const { username, password } = req.body;

  console.log("Username:", username);
  console.log("Password:", password);


  res.redirect("/");
});

module.exports = router;