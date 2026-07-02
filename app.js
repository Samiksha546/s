const express = require("express");
const { Pool } = require("pg");

const app = express();
app.use(express.json());

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "password",
  database: "studentdb",
  port: 5432,
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE username = $1 AND password = $2",
      [username, password]
    );

    if (result.rows.length > 0) {
      res.status(200).json({ message: "Login Successful" });
    } else {
      res.status(401).json({ message: "Invalid Username or Password" });
    }
  } catch (err) {
    res.status(500).json({ message: "Database Error" });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
