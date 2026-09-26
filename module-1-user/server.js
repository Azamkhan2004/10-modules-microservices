const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const users = [
  {
    id: 1,
    name: "Azam",
    email: "azam@example.com"
  },
  {
    id: 2,
    name: "User Two",
    email: "user2@example.com"
  }
];

app.get("/health", (req, res) => {
  res.json({
    module: "module-1-user",
    status: "UP"
  });
});

app.get("/api/users", (req, res) => {
  res.json(users);
});

app.get("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);

  const user = users.find((item) => item.id === id);

  if (!user) {
    return res.status(404).json({
      error: "User not found"
    });
  }

  res.json(user);
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Module 1 running on port ${PORT}`);
});
