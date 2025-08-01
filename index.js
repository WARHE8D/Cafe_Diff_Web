const express = require("express");
const app = express();
const path = require("path");
const port = 8081;
const appDir = path.dirname(require.main.filename);
const { body, validationResult } = require("express-validator");
const { redisClient, connectRedis } = require('./api/redisClient');


//server API calls
const getHome = require('./api/serverApi');

/// Set the view engine to EJS
app.set("view engine", "ejs");
// Set the absolute path to the views directory
app.set("views", path.join(appDir, "public", "views"));

// Serve static files for CSS/JS
app.use(express.static(path.join(appDir, "public")));

//for req body
app.use(express.urlencoded({ extended: true }));
// Allow express to handle JSON for validation
app.use(express.json());

// Connect Redis before starting the server
connectRedis().then(() => {
  app.listen(port, () => {//express server
    console.log("Redis connected"); 
    console.log('Server running on http://localhost:' + port);
  });
});

//for / and home to used as same
app.get(["/", "/home"], async  (req, res) => {
  try {
    const homeData = await getHome(); 
    console.log("Home Data:", homeData); // Log the data for debugging
    res.render("index", {
      pageTitle: "Cafe Diff",
    });
  } catch (error) {
    console.error("Error in /home route:", error);
    return res.status(500).send("Internal Server Error");
  }
    
});

app.get("/featuredgames", (req, res) => {
  
  res.render("featuredgames", {
    pageTitle: "Cafe Diff",
  });
});

app.get("/login", (req, res) => {
  res.render("login", {
    pageTitle: "Cafe Diff",
  });
});

app.get("/register", (req, res) => {
  res.render("register", {
    errors: [],
    oldInput: {}
  });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  // Perform login logic here (e.g., check credentials in a database)
  // For demonstration purposes, we'll just log the credentials
  console.log("Username:", username);
  console.log("Password:", password);

  // Redirect to the home page after login
  res.redirect("/");
});

app.post(
  "/register",
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
    if (!errors.nopisEmpty()) {
  return res.status(400).render("register", {
    errors: errors.array(),
    oldInput: req.body
  });
}

    const { username, email, password } = req.body;
    // Save user to DB or any registration logic here
    console.log("Username:", username);
    console.log("Email:", email);
    console.log("Password:", password);

    res.redirect("/");
  }
);
