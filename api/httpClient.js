//base config for axios
// This file sets up a base configuration for axios to be used in the application.

const axios = require('axios');

const httpClient = axios.create({
  baseURL: 'http://localhost:8080/cafediff', // base URL
  timeout: 5000, //timeout for requests
  headers: {
    'Content-Type': 'application/json',
    //add auth header later
    
  },
});

module.exports = httpClient;