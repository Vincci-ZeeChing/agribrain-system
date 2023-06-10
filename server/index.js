// Require any necessary modules or dependencies
const express = require('express');

// Create an instance of the Express application
const app = express();

// Define routes
app.get('/', (req, res) => {
    res.send('Welcome to Agribrain System!');
});

// Start the server
const port = 5000;
app.listen(port, () => {

    console.log(`Server running on port ${port}`);
});
