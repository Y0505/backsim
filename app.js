// --------------------------------------------
// This is a simple user management API.
// **Important Notice:**  
// All user data in this code is **fake and for demonstration only**.
// Please NEVER use real, sensitive, or personal information in this project or on this server.
// This code is intended for practice, learning, and testing purposes only.
// https://github.com/Y0505/backsim
// --------------------------------------------

const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

// In-memory fake user data
let users = [
  { id: 13577405, name: "Yaser", email: "Yaser@example.com" },
  { id: 17008506, name: "bot", email: "bot@example.com" },
];

// Simple middleware to simulate random server errors
function errorSimulator(req, res, next) {
  const random = Math.random();
  if (random < 0.1) return res.status(500).json({ error: "Internal Server Error (simulated)" });
  if (random < 0.2) return res.status(400).json({ error: "Bad Request (simulated)" });
  next();
}
app.use(errorSimulator);

// Simple fake authentication middleware
function authMiddleware(req, res, next) {
  const token = req.headers['authorization'];
  if (!token || token !== "Bearer faketoken123") {
    return res.status(401).json({ error: "Unauthorized: Please provide valid token" });
  }
  next();
}

// Fake login route (returns a static token)
app.post('/auth/login', (req, res) => {
  const { username, password } = req.body;
  if (username === "test" && password === "123") {
    return res.json({ token: "faketoken123", message: "Welcome! Use this token in Authorization header" });
  }
  res.status(401).json({ error: "Invalid credentials" });
});

// Protect all /users routes with auth middleware
app.use('/users', authMiddleware);

// Get all users
app.get('/users', (req, res) => {
  res.json({
    description: "This endpoint returns all users. You can use GET method to fetch user list.",
    data: users,
  });
});

// Get user by ID
app.get('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  res.json({
    description: `This endpoint returns user details for user id ${id}.`,
    data: user,
  });
});

// Create a new user
app.post('/users', (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required" });
  }
  const newUser = { id: users.length + 1, name, email };
  users.push(newUser);
  res.status(201).json({
    description: "User created successfully!",
    data: newUser,
  });
});

// Update an existing user
app.put('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  let user = users.find(u => u.id === id);
  if (!user) return res.status(404).json({ error: "User not found" });

  const { name, email } = req.body;
  if (name) user.name = name;
  if (email) user.email = email;

  res.json({
    description: `User id ${id} updated successfully.`,
    data: user,
  });
});

// Delete a user
app.delete('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = users.findIndex(u => u.id === id);
  if (index === -1) return res.status(404).json({ error: "User not found" });

  users.splice(index, 1);
  res.json({ description: `User id ${id} deleted successfully.` });
});

// Default root route
app.get('/', (req, res) => {
  res.send(`
    <h2>Welcome to BackSim API</h2>
    <p>Use /auth/login to get token (username: test, password: 123)</p>
    <p>Then use token "faketoken123" in Authorization header for /users routes</p>
  `);
});

// Start server
app.listen(PORT, () => {
  console.log(`BackSim API running on port ${PORT}`);
});
