const express = require('express');
const serverless = require('serverless-http');
const fs = require('fs');
const path = require('path');
const router = express.Router();

let records = [];

router.get('/', (req, res) => {
  res.send({"paths": {
      "tecdoc": "http://localhost:3000/tecdoc"
  }})
})

router.get('/tecdoc', (req, res) => {
  const filePath = path.join(__dirname, 'tecdoc_response.json'); // Adjust path if needed

  // Read the file asynchronously
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return res.status(500).json({ error: 'Failed to read JSON file' });
    }
    
    try {
      const jsonData = JSON.parse(data); // Parse the JSON file content
      // res.json(jsonData); // Send JSON response
      const aricleIds = jsonData.articles.map(data => ({"reference": data.articleNumber}))
      res.json(aricleIds)
    } catch (parseErr) {
      console.error('Error parsing JSON:', parseErr);
      res.status(500).json({ error: 'Failed to parse JSON' });
    }
  });
})

app.use('/.netlify/functions/api', router);
module.exports.handler = serverless(app);