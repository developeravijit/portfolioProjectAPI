const express = require("express");
const projectController = require("../controller/projectController");

const router = express.Router();

router.post("/create", projectController.createProject);
router.get("/show", projectController.showProjects);

module.exports = router;
