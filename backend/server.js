const dns = require('dns').promises;   // or just require('dns') in older Node
dns.setServers(['8.8.8.8', '1.1.1.1']);

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api", require("./routes/authRoutes"));
app.use("/api", require("./routes/grievanceRoutes"));

// Use PORT from .env OR fallback
const PORT = process.env.PORT || 5000;

// DB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("MongoDB Connected");

  // Start server AFTER DB connects
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

})
.catch(err => console.log(err));