const mysql = require('mysql2');

// Create the connection to the database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // XAMPP default password is empty
  database: 'civic_hub'
});

connection.connect(err => {
  if (err) {
    console.error('Error connecting to XAMPP: ' + err.stack);
    return;
  }
  console.log('Success! Your code is now talking to your XAMPP database.');
});