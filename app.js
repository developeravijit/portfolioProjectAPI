require("dotenv").config();
const express = require("express");
const DbConnect = require("./app/config/database");
const router = require("./app/routes/projectRoutes");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();

DbConnect();

// JSON Configuration
app.use(express.json());

// Static Folder
app.use(express.static(path.join(__dirname, "/uploads")));

const uploadPath = path.join(__dirname, "uploads");

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}

// Define Cross Origin
app.use(cors());

// Define Router
app.use("/api", router);

const PORT = process.env.PORT || 4500;

app.listen(PORT, () => {
  console.log(`Port is running on ${PORT}`);
});
