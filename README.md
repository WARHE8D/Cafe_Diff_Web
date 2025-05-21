# Cafe_Diff_Web
Web app for CafeDiff using Node 


# Setup

Note: Redis will be deployed on docker later

# Step 1: Initialize the project
npm init -y

# Step 2: Install required dependencies
npm i --save-dev nodemon ejs express express-validator create-start redis

# Step 3: Start the server
npm run start

# Troubleshooting and self-fix:
# 1. Verify packages installation
npm list

# 2. Ensure package.json has index.js in start script
# Add the following if missing:
# "scripts": {
#   "test": "echo \"Error: no test specified\" && exit 1",
#   "start": "nodemon index.js"
# }

# Project Structure

/project-root
│
├── /views # EJS templates for rendering
├── /public # Static files (CSS, JS, Images)
├── index.js # Main server file
├── package.json # Project metadata and dependencies
└── README.md # Documentation
