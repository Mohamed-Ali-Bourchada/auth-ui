const express = require('express');
const compression = require('compression');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4200;

// Enable compression
app.use(compression());

// Serve static files from the browser directory
app.use(express.static(path.join(__dirname, 'dist/auth-dashboard/browser')));

// Send all requests to index.html
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/auth-dashboard/browser/index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
