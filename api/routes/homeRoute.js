//for server API calls
const httpClient = require('../httpClient');
const express = require("express");
const router = express.Router();

//for / and home to used as same
router.get('/', async  (req, res) => {
  try {
    const homeData = await httpClient.get('/auth/');
    console.log("Home Data:", homeData); // Log the data for debugging
    res.render("index", {
      pageTitle: "Cafe Diff",
    });
  } catch (error) {
    console.error("Error in /home route:", error);
    return res.status(500).send("Internal Server Error");
  }
    
});
module.exports = router;