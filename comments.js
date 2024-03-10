// Create web server

// Import modules
const express = require('express');
const app = express();
const fs = require('fs');

// Set up server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

// Set up middleware to parse request body
app.use(express.json());

// Set up middleware to serve static files
app.use(express.static('public'));

// Set up routes
app.get('/comments', (req, res) => {
  // Read comments from file
  fs.readFile('comments.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Internal server error');
    } else {
      res.json(JSON.parse(data));
    }
  });
});

app.post('/comments', (req, res) => {
  // Read comments from file
  fs.readFile('comments.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Internal server error');
    } else {
      const comments = JSON.parse(data);
      // Add new comment
      comments.push(req.body);
      // Write comments to file
      fs.writeFile('comments.json', JSON.stringify(comments), (err) => {
        if (err) {
          res.status(500).send('Internal server error');
        } else {
          res.status(201).json(req.body);
        }
      });
    }
  });
});