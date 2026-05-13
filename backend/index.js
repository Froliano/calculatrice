const express = require("express");
const { add, subtract, multiply, divide } = require("./calculator");

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/add/:a/:b", (req, res) => {
  const a = parseFloat(req.params.a);
  const b = parseFloat(req.params.b);
  res.json({ result: add(a, b) });
});

app.get("/subtract/:a/:b", (req, res) => {
  const a = parseFloat(req.params.a);
  const b = parseFloat(req.params.b);
  res.json({ result: subtract(a, b) });
});

app.get("/multiply/:a/:b", (req, res) => {
  const a = parseFloat(req.params.a);
  const b = parseFloat(req.params.b);
  res.json({ result: multiply(a, b) });
});

app.get("/divide/:a/:b", (req, res) => {
  const a = parseFloat(req.params.a);
  const b = parseFloat(req.params.b);
  try {
    res.json({ result: divide(a, b) });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

if (require.main === module) {
  app.listen(8000, () => console.log("Server running on http://localhost:8000"));
}

module.exports = app;
