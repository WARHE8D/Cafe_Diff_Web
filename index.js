const express = require("express");
const app = express();
const path = require("path");
const port = 8081;
const appDir = path.dirname(require.main.filename);


//api routes
const { redisClient, connectRedis } = require('./api/routes/redisClient');
const getHomeRoute = require('./api/routes/homeRoute');
const userSignupRoute = require('./api/routes/userSignupRoute');
const userLoginRoute = require('./api/routes/loginRoute');

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


//use routes
app.use(["/", "/home"], getHomeRoute)
app.use('/register',userSignupRoute);
app.use('/login',userLoginRoute);


// Connect Redis before starting the server
connectRedis().then(() => {
  app.listen(port, () => {//express server
    console.log("Redis connected"); 
    console.log('Server running on http://localhost:' + port);
  });
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



