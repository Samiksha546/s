const express = require("express");
const { Pool } = require("pg");

const app = express();
app.use(express.json());

// PostgreSQL connection
const pool = new Pool({
    host: "localhost",
    user: "postgres",
    password: "password",
    database: "studentdb",
    port: 5432
});

// Login API
app.post("/login", async (req, res) => {

    // Get username and password from frontend
    const { username, password } = req.body;

    // SQL query
    const sql = "SELECT * FROM users WHERE username = $1 AND password = $2";

    try {
        const result = await pool.query(sql, [username, password]);

        if (result.rows.length > 0) {
            res.json({ message: "Login Successful" });
        } else {
            res.status(401).json({ message: "Invalid Username or Password" });
        }
    } catch (err) {
        res.status(500).json({ message: "Database Error" });
    }
});

// Start server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});
