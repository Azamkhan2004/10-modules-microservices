const express = require("express");

const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.json());

const orders = [
  {
    id: 1,
    userId: 1,
    productId: 1,
    quantity: 1,
    status: "CONFIRMED"
  },
  {
    id: 2,
    userId: 2,
    productId: 2,
    quantity: 2,
    status: "PENDING"
  }
];

app.get("/health", (req, res) => {
  res.json({
    module: "module-3-order",
    status: "UP"
  });
});

app.get("/api/orders", (req, res) => {
  res.json(orders);
});

app.get("/api/orders/:id", (req, res) => {
  const id = Number(req.params.id);

  const order = orders.find((item) => item.id === id);

  if (!order) {
    return res.status(404).json({
      error: "Order not found"
    });
  }

  res.json(order);
});

app.post("/api/orders", (req, res) => {
  const { userId, productId, quantity } = req.body;

  if (!userId || !productId || !quantity) {
    return res.status(400).json({
      error: "userId, productId and quantity are required"
    });
  }

  const newOrder = {
    id: orders.length + 1,
    userId,
    productId,
    quantity,
    status: "PENDING"
  };

  orders.push(newOrder);

  res.status(201).json(newOrder);
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Module 3 running on port ${PORT}`);
});
