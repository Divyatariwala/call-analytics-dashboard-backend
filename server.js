const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/calls", require("./routes/calls"));

// Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// MongoDB Connection (FIXED)
mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/cdr_db")
  .then(() => {
    console.log("MongoDB Connected");

    // Start server ONLY after DB connects
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => console.log("MongoDB Error:", err));