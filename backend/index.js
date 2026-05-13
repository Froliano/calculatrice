const express = require("express");
const client = require("prom-client");
const { add, subtract, multiply, divide } = require("./calculator");

const app = express();

const register = new client.Registry();
client.collectDefaultMetrics({ register });

const operationCounter = new client.Counter({
  name: "calculator_operations_total",
  help: "Nombre total d'opérations effectuées",
  labelNames: ["operation"],
  registers: [register],
});

const operationDuration = new client.Histogram({
  name: "calculator_operation_duration_seconds",
  help: "Durée des opérations en secondes",
  labelNames: ["operation"],
  buckets: [0.001, 0.005, 0.01, 0.05, 0.1],
  registers: [register],
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/metrics", async (req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});

app.get("/add/:a/:b", (req, res) => {
  const end = operationDuration.startTimer({ operation: "add" });
  const a = parseFloat(req.params.a);
  const b = parseFloat(req.params.b);
  const result = add(a, b);
  operationCounter.inc({ operation: "add" });
  end();
  res.json({ result });
});

app.get("/subtract/:a/:b", (req, res) => {
  const end = operationDuration.startTimer({ operation: "subtract" });
  const a = parseFloat(req.params.a);
  const b = parseFloat(req.params.b);
  const result = subtract(a, b);
  operationCounter.inc({ operation: "subtract" });
  end();
  res.json({ result });
});

app.get("/multiply/:a/:b", (req, res) => {
  const end = operationDuration.startTimer({ operation: "multiply" });
  const a = parseFloat(req.params.a);
  const b = parseFloat(req.params.b);
  const result = multiply(a, b);
  operationCounter.inc({ operation: "multiply" });
  end();
  res.json({ result });
});

app.get("/divide/:a/:b", (req, res) => {
  const end = operationDuration.startTimer({ operation: "divide" });
  const a = parseFloat(req.params.a);
  const b = parseFloat(req.params.b);
  try {
    const result = divide(a, b);
    operationCounter.inc({ operation: "divide" });
    end();
    res.json({ result });
  } catch (e) {
    end();
    res.status(400).json({ error: e.message });
  }
});

if (require.main === module) {
  app.listen(8000, () => console.log("Server running on http://localhost:8000"));
}

module.exports = app;
