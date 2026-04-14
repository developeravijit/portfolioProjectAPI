const projectModel = require("../model/projectModel");
const HTTPStatusCode = require("../utils/http");

class projectController {
  async createProject(req, res) {
    try {
      const { title, techstack, url, desc, img } = req.body;

      if ((!title, !techstack, !url, !desc)) {
        return res.status(HTTPStatusCode.Bad_Request).json({
          success: false,
          message: "All fields are required",
        });
      }

      const existingProject = await projectModel.findOne({ title });

      if (existingProject) {
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
        img,
      });

      const result = await projectData.save();

      if (result) {
        return res.status(HTTPStatusCode.Created).json({
          success: true,
          message: "New Project Created",
          data: result,
        });
      }
    } catch (error) {
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
