const express = require("express");

const app = express();
const PORT = process.env.PORT || 3004;

app.use(express.json());

const payments = [
  {
    id: 1,
    orderId: 1,
    amount: 75000,
    method: "CARD",
    status: "SUCCESS"
  },
  {
    id: 2,
    orderId: 2,
    amount: 60000,
    method: "UPI",
    status: "PENDING"
  }
];

app.get("/health", (req, res) => {
  res.json({
    module: "module-5-payment",
    status: "UP"
  });
});

app.get("/api/payments", (req, res) => {
  res.json(payments);
});

app.get("/api/payments/:id", (req, res) => {
  const id = Number(req.params.id);

  const payment = payments.find((item) => item.id === id);

  if (!payment) {
    return res.status(404).json({
      error: "Payment not found"
    });
  }

  res.json(payment);
});

app.post("/api/payments", (req, res) => {
  const { orderId, amount, method } = req.body;

  if (!orderId || !amount || !method) {
    return res.status(400).json({
      error: "orderId, amount and method are required"
    });
  }

  const newPayment = {
    id: payments.length + 1,
    orderId,
    amount,
    method,
    status: "PENDING"
  };

  payments.push(newPayment);

  res.status(201).json(newPayment);
});

app.put("/api/payments/:id/status", (req, res) => {
  const id = Number(req.params.id);
  const { status } = req.body;

  const payment = payments.find((item) => item.id === id);

  if (!payment) {
    return res.status(404).json({
      error: "Payment not found"
    });
  }

  payment.status = status;

  res.json(payment);
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Module 5 running on port ${PORT}`);
});
