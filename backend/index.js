const express = require("express");
const { Pool } = require("pg");

const app = express();

// const pool = new Pool({
//   host: process.env.DB_HOST || "db",
//   port: 5432,
//   database: process.env.DB_NAME || "calculatrice",
//   user: process.env.DB_USER || "user",
//   password: process.env.DB_PASSWORD || "password",
// });

// async function initDb() {
//   await pool.query(`
//     CREATE TABLE IF NOT EXISTS history (
//       id SERIAL PRIMARY KEY,
//       operation VARCHAR(10) NOT NULL,
//       a FLOAT NOT NULL,
//       b FLOAT NOT NULL,
//       result FLOAT NOT NULL,
//       created_at TIMESTAMP DEFAULT NOW()
//     )
//   `);
// }

async function saveOperation(operation, a, b, result) {
  await pool.query(
    "INSERT INTO history (operation, a, b, result) VALUES ($1, $2, $3, $4)",
    [operation, a, b, result]
  );
}

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/add/:a/:b", async (req, res) => {
  const a = parseFloat(req.params.a);
  const b = parseFloat(req.params.b);
  const result = a + b;
  // await saveOperation("add", a, b, result);
  res.json({ result });
});

app.get("/subtract/:a/:b", async (req, res) => {
  const a = parseFloat(req.params.a);
  const b = parseFloat(req.params.b);
  const result = a - b;
  // await saveOperation("subtract", a, b, result);
  res.json({ result });
});

app.get("/multiply/:a/:b", async (req, res) => {
  const a = parseFloat(req.params.a);
  const b = parseFloat(req.params.b);
  const result = a * b;
  // await saveOperation("multiply", a, b, result);
  res.json({ result });
});

app.get("/divide/:a/:b", async (req, res) => {
  const a = parseFloat(req.params.a);
  const b = parseFloat(req.params.b);
  if (b === 0) {
    return res.status(400).json({ error: "Division par zéro impossible" });
  }
  const result = a / b;
  await saveOperation("divide", a, b, result);
  res.json({ result });
});

// app.get("/history", async (req, res) => {
//   const { rows } = await pool.query(
//     "SELECT * FROM history ORDER BY created_at DESC LIMIT 50"
//   );
//   res.json(rows);
// });

// initDb().then(() => {
//   app.listen(8000, () => console.log("Calculatrice API démarrée sur le port 8000"));
// });

app.listen(8000, () => {
  console.log(`Server running on http://localhost:8000`);
});
