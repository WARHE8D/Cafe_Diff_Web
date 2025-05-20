const express = require("express");
const app = express();
const path = require("path");
const port = 8081;
const appDir = path.dirname(require.main.filename);
const { body, validationResult } = require("express-validator");

/// Set the view engine to EJS
app.set("view engine", "ejs");
// console.log("asdasdas: " + path.join(appDir, "public", "views"));
// Set the absolute path to the views directory
app.set("views", path.join(appDir, "public", "views"));

// Serve static files for CSS/JS
app.use(express.static(path.join(appDir, "public")));

//for req body
app.use(express.urlencoded({ extended: true }));
// Allow express to handle JSON for validation
app.use(express.json());

app.listen(port, () => {
  console.log("server running at:", port);
});

//for / and home to used as same
app.get(["/", "/home"], (req, res) => {
    res.render("index", {
      pageTitle: "Cafe Diff",
    });
});