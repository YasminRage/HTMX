const express = require('express');
const path = require('path');

const app = express();   

let currentPrice = 60;

// Serve static files from "public" folder
app.use(express.static('public'));

// Price endpoint
app.get('/get-price', (req, res) => {
    const change = Math.random() * 2 - 1;
    currentPrice += change;

    res.send(`$${currentPrice.toFixed(2)}`);
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});