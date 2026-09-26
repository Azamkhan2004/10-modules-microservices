const express = require("express");

const app = express();
const PORT = process.env.PORT || 3003;

app.use(express.json());

const inventory = [
  {
    id: 1,
    productId: 1,
    productName: "Laptop",
    quantity: 10
  },
  {
    id: 2,
    productId: 2,
    productName: "Mobile Phone",
    quantity: 25
  },
  {
    id: 3,
    productId: 3,
    productName: "Keyboard",
    quantity: 50
  }
];

app.get("/health", (req, res) => {
  res.json({
    module: "module-4-inventory",
    status: "UP"
  });
});

app.get("/api/inventory", (req, res) => {
  res.json(inventory);
});

app.get("/api/inventory/:productId", (req, res) => {
  const productId = Number(req.params.productId);

  const item = inventory.find(
    (product) => product.productId === productId
  );

  if (!item) {
    return res.status(404).json({
      error: "Product inventory not found"
    });
  }

  res.json(item);
});

app.put("/api/inventory/:productId", (req, res) => {
  const productId = Number(req.params.productId);
  const { quantity } = req.body;

  if (quantity === undefined || quantity < 0) {
    return res.status(400).json({
      error: "A valid quantity is required"
    });
  }

  const item = inventory.find(
    (product) => product.productId === productId
  );

  if (!item) {
    return res.status(404).json({
      error: "Product inventory not found"
    });
  }

  item.quantity = quantity;

  res.json(item);
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Module 4 running on port ${PORT}`);
});
