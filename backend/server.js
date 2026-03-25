const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require('./routes/authRoutes'); 
const postRoutes = require("./routes/postRoutes");
dotenv.config();

const app = express();

// call function
connectDB();

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.json());
// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/posts", require("./routes/postRoutes"));



// Server
app.listen(5000, () => console.log("Server running on port 5000"));