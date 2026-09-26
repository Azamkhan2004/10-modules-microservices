const express = require("express");

const app = express();
const PORT = process.env.PORT || 3005;

app.use(express.json());

const notifications = [
  {
    id: 1,
    userId: 1,
    type: "ORDER",
    message: "Your order has been confirmed.",
    status: "SENT"
  },
  {
    id: 2,
    userId: 2,
    type: "PAYMENT",
    message: "Your payment is pending.",
    status: "PENDING"
  }
];

app.get("/health", (req, res) => {
  res.json({
    module: "module-6-notification",
    status: "UP"
  });
});

app.get("/api/notifications", (req, res) => {
  res.json(notifications);
});

app.get("/api/notifications/:id", (req, res) => {
  const id = Number(req.params.id);

  const notification = notifications.find(
    (item) => item.id === id
  );

  if (!notification) {
    return res.status(404).json({
      error: "Notification not found"
    });
  }

  res.json(notification);
});

app.post("/api/notifications", (req, res) => {
  const { userId, type, message } = req.body;

  if (!userId || !type || !message) {
    return res.status(400).json({
      error: "userId, type and message are required"
    });
  }

  const newNotification = {
    id: notifications.length + 1,
    userId,
    type,
    message,
    status: "PENDING"
  };

  notifications.push(newNotification);

  res.status(201).json(newNotification);
});

app.put("/api/notifications/:id/status", (req, res) => {
  const id = Number(req.params.id);
  const { status } = req.body;

  const notification = notifications.find(
    (item) => item.id === id
  );

  if (!notification) {
    return res.status(404).json({
      error: "Notification not found"
    });
  }

  notification.status = status;

  res.json(notification);
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Module 6 running on port ${PORT}`);
});
