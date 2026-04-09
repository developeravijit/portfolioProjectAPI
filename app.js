require("dotenv").config();
const express = require("express");
const DbConnect = require("./app/config/database");
const router = require("./app/routes/projectRoutes");
const cors = require("cors");
const app = express();

DbConnect();

// JSON Configuration
app.use(express.json());

// Define Cross Origin
app.use(cors());

// Define Router
app.use("/api", router);

const PORT = process.env.PORT || 4500;

app.listen(PORT, () => {
  console.log(`Port is running on ${PORT}`);
});
