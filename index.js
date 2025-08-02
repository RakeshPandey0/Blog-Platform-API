const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.route");
const blogRoutes = require("./routes/blog.route");
const connectDB = require("./config/db");

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/user", authRoutes);
app.use("/api/blog", blogRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("API is running");
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server started at http://localhost:${PORT}`);
});
