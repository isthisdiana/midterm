/* const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json()); // Parse JSON bodies (as sent by API clients)

const items = 
  [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' },
  ];

app.get('/api/items', (req, res) => {
  res.json(items);
});

app.post("/api/items", (req, res) => {
  const newItem = {id: items.length + 1, name: req.body.name};
  items.push(newItem);
  res.status(201).json(newItem);
});

app.put("/api/items/:id", (req, res) => {
  const item = items.find (i => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).send('Item not found');

  item.name = req.body.name;
  res.json(item);

});

app.delete("/api/items/:id", (req, res) => {
  const index = items.findIndex(i => i.id === parseInt(req.params.id));
  items.splice(index, 1);
  res.json({ message: 'Item deleted' });

});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

*/

const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

//  Update these values based on your MySQL server setup
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',        // <-- type your MySQL password if any
  database: 'cor_system' // this should match the database name in your .sql file
});

// Check connection
db.connect(err => {
  if (err) {
    console.error(' Database connection failed:', err);
    return;
  }
  console.log(' Connected to MySQL Database');
});

// Example API - Get subjects
app.get('/api/subjects', (req, res) => {
  db.query('SELECT * FROM subjects', (err, results) => {
    if (err) {
      res.status(500).send('Error fetching subjects'); 
      
      return;
    }
    res.json(results);
  });
});

app.listen(PORT, () => {
  console.log(` Server running at http://localhost:${PORT}`);
});
