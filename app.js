const express = require('express');
const crypto = require('crypto');
require('dotenv').config(); // Load environment variables from .env
const app = express();

// Function to generate a random string
const generateRandomString = (length) => {
  return crypto.randomBytes(length).toString('hex');
};

// Define a route that redirects to the Auth0 authorization URL with random nonce and state values
app.get('/start', (req, res) => {
  const nonce = generateRandomString(16); // Generate a 16-character random nonce
  const state = generateRandomString(16); // Generate a 16-character random state

  const auth0URL = process.env.AUTH0_AUTH_URL +
    `?client_id=${process.env.AUTH0_CLIENT_ID}` +
    '&max_age=300' +
    '&response_type=id_token token' +
    `&redirect_uri=${process.env.AUTH0_REDIRECT_URI}` +
    '&scope=openid profile' +
    `&nonce=${nonce}` +
    `&state=${state}`;

  res.redirect(auth0URL);
});

// Start the Express app on port 3000
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
