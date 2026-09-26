const express = require("express");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

const products = [
  {
    id: 1,
    name: "Laptop",
    price: 75000,
    stock: 10
  },
  {
    id: 2,
    name: "Mobile Phone",
    price: 30000,
    stock: 25
  },
  {
    id: 3,
    name: "Keyboard",
    price: 2500,
    stock: 50
  }
];

app.get("/health", (req, res) => {
  res.json({
    module: "module-2-product",
    status: "UP"
  });
});

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.get("/api/products/:id", (req, res) => {
  const id = Number(req.params.id);

  const product = products.find((item) => item.id === id);

  if (!product) {
    return res.status(404).json({
      error: "Product not found"
    });
  }

  res.json(product);
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Module 2 running on port ${PORT}`);
});
