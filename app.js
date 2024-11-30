const express = require('express')
const app = express()
const port = 3000
const fs = require('fs');
const path = require('path');

app.get('/', (req, res) => {
    res.send({"paths": {
        "tecdoc": "http://localhost:3000/tecdoc"
    }})
})

app.get('/tecdoc', (req, res) => {
    const filePath = path.join(__dirname, 'tecdoc_response.json'); // Adjust path if needed
  
    // Read the file asynchronously
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading file:', err);
        return res.status(500).json({ error: 'Failed to read JSON file' });
      }
      
      try {
        const jsonData = JSON.parse(data); // Parse the JSON file content
        res.json(jsonData); // Send JSON response
      } catch (parseErr) {
        console.error('Error parsing JSON:', parseErr);
        res.status(500).json({ error: 'Failed to parse JSON' });
      }
    });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})