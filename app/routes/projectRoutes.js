const express = require("express");
const projectController = require("../controller/projectController");
const projectImg = require("../middlewear/imageUpload");

const router = express.Router();

router.post(
  "/create",
  projectImg.single("image"),
  projectController.createProject,
);
router.get("/show", projectController.showProjects);

module.exports = router;
