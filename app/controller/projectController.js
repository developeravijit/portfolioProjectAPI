const projectModel = require("../model/projectModel");
const HTTPStatusCode = require("../utils/http");
const fs = require("fs");

const deleteFile = (filePath) => {
  try {
    if (filePath) fs.unlinkSync(filePath);
  } catch (err) {
    console.log("File delete error:", err);
  }
};

class projectController {
  async createProject(req, res) {
    try {
      const { title, techstack, url, desc } = req.body;

      if (!title || !techstack || !url || !desc) {
        deleteFile(req.file?.path);
        return res.status(HTTPStatusCode.Bad_Request).json({
          success: false,
          message: "All fields are required",
        });
      }

      const existingProject = await projectModel.findOne({ title });

      if (existingProject) {
        deleteFile(req.file?.path);
        return res.status(HTTPStatusCode.Bad_Request).json({
          success: false,
          message: "Project is already created",
        });
      }

      const projectData = new projectModel({
        title,
        techstack,
        url,
        desc,
        image: req.file ? `/uploads/${req.file.filename}` : "",
      });

      const result = await projectData.save();

      return res.status(HTTPStatusCode.Created).json({
        success: true,
        message: "New Project Created",
        data: result,
      });
    } catch (error) {
      deleteFile(req.file?.path);

      return res.status(HTTPStatusCode.Server_Error).json({
        success: false,
        message: error.message,
      });
    }
  }

  async showProjects(req, res) {
    try {
      const data = await projectModel.find();
      if (!data || data.length === 0) {
        return res.status(HTTPStatusCode.Not_Found).json({
          success: false,
          message: "No Projectes found",
        });
      }
      return res.status(HTTPStatusCode.OK).json({
        success: true,
        message: "All Projects",
        totalProjects: data.length,
        data: data,
      });
    } catch (error) {
      return res.status(HTTPStatusCode.Server_Error).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = new projectController();
