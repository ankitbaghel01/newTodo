const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
const port = 4500;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'college',
});

db.connect();

app.get('/api/data', (req, res) => {
  db.query('SELECT * FROM students', (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

app.put('/api/update/:id', (req, res) => {
  const { id } = req.params;
  const { updatedName, updatedEmail, updatedMno } = req.body;

  db.query(
    'UPDATE students SET name = ?, email = ?, mno = ? WHERE id = ?',
    [updatedName, updatedEmail, updatedMno, id],
    (err, result) => {
      if (err) throw err;
      res.json({ message: 'Data updated successfully' });
    }
  );
});

app.delete('/api/delete/:id', (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM students WHERE id = ?', [id], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Data deleted successfully' });
  });
});

app.post('/api/add', (req, res) => {
  const { name, email, mno } = req.body;

  db.query(
    'INSERT INTO students (name, email, mno) VALUES (?, ?, ?)',
    [name, email, mno],
    (err, result) => {
      if (err) throw err;
      res.json({ message: 'Data added successfully' });
    }
  );
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
