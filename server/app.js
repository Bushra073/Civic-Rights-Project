// const express = require('express');
// const mysql = require('mysql2');
// const cors = require('cors');

// const app = express();
// app.use(cors());
// app.use(express.json()); // This allows the server to read the data sent from your HTML form

// // 1. Connect to MySQL (XAMPP)
// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '', // XAMPP default is empty
//     database: 'civic_hub'
// });

// db.connect(err => {
//     if (err) {
//         console.error('Database connection failed: ' + err.stack);
//         return;
//     }
//     console.log('Connected to MySQL Database.');
// });

// // 2. The "Register" Route
// app.post('/register', (req, res) => {
//     const { username, email, password, role } = req.body;

//     const sql = "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)";
    
//     db.query(sql, [username, email, password, role], (err, result) => {
//         if (err) {
//             console.error(err);
//             return res.status(500).send("Error saving user to database.");
//         }
//         res.send({ message: "User registered successfully!" });
//     });
// });


// // The "Login" Route
// app.post('/login', (req, res) => {
//     const { email, password } = req.body;

//     // We look for a user with matching email AND password
//     const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
    
//     db.query(sql, [email, password], (err, results) => {
//         if (err) return res.status(500).send("Server error");

//         if (results.length > 0) {
//             // Success! We found the user. 
//             // We send back their role so the frontend knows where to send them.
//             const user = results[0];
//             res.send({ 
//                 id: user.id,
//                 message: "Login successful!", 
//                 role: user.role,
//                 username: user.username 
//             });
//         } else {
//             // No user found with those credentials
//             res.status(401).send({ message: "Invalid email or password" });
//         }
//     });
// });



// // Route to submit a complaint
// app.post('/report', (req, res) => {
//     const { user_id, title, category, description, location } = req.body;
//     const sql = "INSERT INTO complaints (user_id, title, category, description, location) VALUES (?, ?, ?, ?, ?)";
    
//     db.query(sql, [user_id, title, category, description, location], (err, result) => {
//         if (err) return res.status(500).send(err);
//         res.send({ message: "Complaint filed!" });
//     });
// });

// // Route to get complaints for a specific user
// app.get('/my-complaints/:userId', (req, res) => {
//     const sql = "SELECT * FROM complaints WHERE user_id = ? ORDER BY created_at DESC";
//     db.query(sql, [req.params.userId], (err, results) => {
//         if (err) return res.status(500).send(err);
//         res.send(results);
//     });
// });



// app.get('/all-complaints', (req, res) => {
//     const sql = `
//         SELECT complaints.*, users.username 
//         FROM complaints 
//         JOIN users ON complaints.user_id = users.id 
//         ORDER BY created_at DESC`;
        
//     db.query(sql, (err, results) => {
//         if (err) return res.status(500).send(err);
//         res.json(results);
//     });
// });

// app.post('/update-status', (req, res) => {
//     const { id, status } = req.body;
//     const sql = "UPDATE complaints SET status = ? WHERE id = ?";
    
//     db.query(sql, [status, id], (err, result) => {
//         if (err) return res.status(500).send(err);
//         res.json({ message: "Status updated successfully" });
//     });
// });

// // ==========================================
// // ADMIN PANEL ROUTES
// // ==========================================
// app.get('/admin/stats', (req, res) => {
//     const sql = `
//         SELECT 
//             (SELECT COUNT(*) FROM users) as totalUsers,
//             (SELECT COUNT(*) FROM complaints) as totalComplaints,
//             (SELECT COUNT(*) FROM complaints WHERE status = 'Pending') as pendingIssues
//     `;
//     db.query(sql, (err, results) => {
//         if (err) return res.status(500).send(err);
//         res.json(results[0]);
//     });
// });

// app.get('/admin/users', (req, res) => {
//     const sql = "SELECT id, username, email, role FROM users";
//     db.query(sql, (err, results) => {
//         if (err) return res.status(500).send(err);
//         res.json(results);
//     });
// });

// app.delete('/admin/delete-user/:id', (req, res) => {
//     const sql = "DELETE FROM users WHERE id = ?";
//     db.query(sql, [req.params.id], (err, result) => {
//         if (err) return res.status(500).send(err);
//         res.json({ message: "User deleted" });
//     });
// });

// // ADMIN: Fetch Global Statistics (Proves SQL Aggregation knowledge)
// app.get('/admin/stats', (req, res) => {
//     const sql = `
//         SELECT 
//             (SELECT COUNT(*) FROM users) as totalUsers,
//             (SELECT COUNT(*) FROM complaints) as totalComplaints,
//             (SELECT COUNT(*) FROM complaints WHERE status = 'Pending') as pendingIssues
//     `;
//     db.query(sql, (err, results) => {
//         if (err) return res.status(500).send(err);
//         res.json(results[0]);
//     });
// });

// // ADMIN: Fetch all users for management
// app.get('/admin/users', (req, res) => {
//     const sql = "SELECT id, username, email, role FROM users";
//     db.query(sql, (err, results) => {
//         if (err) return res.status(500).send(err);
//         res.json(results);
//     });
// });

// // ADMIN: Delete a user (Demonstrates the 'D' in CRUD)
// app.delete('/admin/delete-user/:id', (req, res) => {
//     const userId = req.params.id;
//     // Because of our ON DELETE CASCADE in the database, 
//     // deleting a user automatically deletes their complaints!
//     const sql = "DELETE FROM users WHERE id = ?";
//     db.query(sql, [userId], (err, result) => {
//         if (err) return res.status(500).send(err);
//         res.json({ message: "User and associated data purged." });
//     });
// });

// // 3. Start the server
// app.listen(3000, () => {
//     console.log('Server is running on http://localhost:3000');
// });

const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// 1. Connect to MySQL (XAMPP)
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', 
    database: 'civic_hub'
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL Database.');
});

// 2. The "Register" Route with Backend Security
app.post('/register', (req, res) => {
    const { username, email, password, role, adminKey } = req.body;

    // --- BACKEND SECURITY CHECK ---
    const SYSTEM_ADMIN_KEY = "dbms"; // The Source of Truth

    if (role === 'admin' && adminKey !== SYSTEM_ADMIN_KEY) {
        return res.status(403).json({ message: "Security Error: Invalid Admin Authorization Key." });
    }

    const sql = "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)";
    
    db.query(sql, [username, email, password, role], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Error saving user to database.");
        }
        res.send({ message: "User registered successfully as " + role + "!" });
    });
});

// The "Login" Route
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
    
    db.query(sql, [email, password], (err, results) => {
        if (err) return res.status(500).send("Server error");

        if (results.length > 0) {
            const user = results[0];
            res.send({ 
                id: user.id,
                message: "Login successful!", 
                role: user.role,
                username: user.username 
            });
        } else {
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

// Authority View: JOIN complaints with users
app.get('/all-complaints', (req, res) => {
    const sql = `
        SELECT complaints.*, users.username 
        FROM complaints 
        JOIN users ON complaints.user_id = users.id 
        ORDER BY created_at DESC`;
        
    db.query(sql, (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

app.post('/update-status', (req, res) => {
    const { id, status } = req.body;
    const sql = "UPDATE complaints SET status = ? WHERE id = ?";
    
    db.query(sql, [status, id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ message: "Status updated successfully" });
    });
});

// ==========================================
// ADMIN PANEL ROUTES (Organized)
// ==========================================
app.get('/admin/stats', (req, res) => {
    const sql = `
        SELECT 
            (SELECT COUNT(*) FROM users) as totalUsers,
            (SELECT COUNT(*) FROM complaints) as totalComplaints,
            (SELECT COUNT(*) FROM complaints WHERE status = 'Pending') as pendingIssues
    `;
    db.query(sql, (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results[0]);
    });
});

app.get('/admin/users', (req, res) => {
    const sql = "SELECT id, username, email, role FROM users";
    db.query(sql, (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

app.delete('/admin/delete-user/:id', (req, res) => {
    const userId = req.params.id;
    const sql = "DELETE FROM users WHERE id = ?";
    db.query(sql, [userId], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ message: "User and associated data purged." });
    });
});

// 3. Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});