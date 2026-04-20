const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); // This allows the server to read the data sent from your HTML form

// 1. Connect to MySQL (XAMPP)
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // XAMPP default is empty
    database: 'civic_hub'
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL Database.');
});

// 2. The "Register" Route
app.post('/register', (req, res) => {
    const { username, email, password, role } = req.body;

    const sql = "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)";
    
    db.query(sql, [username, email, password, role], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Error saving user to database.");
        }
        res.send({ message: "User registered successfully!" });
    });
});


// The "Login" Route
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // We look for a user with matching email AND password
    const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
    
    db.query(sql, [email, password], (err, results) => {
        if (err) return res.status(500).send("Server error");

        if (results.length > 0) {
            // Success! We found the user. 
            // We send back their role so the frontend knows where to send them.
            const user = results[0];
            res.send({ 
                id: user.id,
                message: "Login successful!", 
                role: user.role,
                username: user.username 
            });
        } else {
            // No user found with those credentials
            res.status(401).send({ message: "Invalid email or password" });
        }
    });
});



// Route to submit a complaint
app.post('/report', (req, res) => {
    const { user_id, title, category, description, location } = req.body;
    const sql = "INSERT INTO complaints (user_id, title, category, description, location) VALUES (?, ?, ?, ?, ?)";
    
    db.query(sql, [user_id, title, category, description, location], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send({ message: "Complaint filed!" });
    });
});

// Route to get complaints for a specific user
app.get('/my-complaints/:userId', (req, res) => {
    const sql = "SELECT * FROM complaints WHERE user_id = ? ORDER BY created_at DESC";
    db.query(sql, [req.params.userId], (err, results) => {
        if (err) return res.status(500).send(err);
        res.send(results);
    });
});





// 3. Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});