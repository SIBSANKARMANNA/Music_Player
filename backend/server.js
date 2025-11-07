const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db"); // if MongoDB
const songRoutes = require("./routes/songRoutes");
const playlistRoutes = require("./routes/playlistRoutes");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// db connection
connectDB();


// serve uploaded files statically
app.use("/uploads", express.static("uploads"));
// routes
app.use("/api/songs", songRoutes);
app.use("/api/playlist", playlistRoutes);

// start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
