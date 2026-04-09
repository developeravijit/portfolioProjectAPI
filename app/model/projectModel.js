const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProjectSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    techstack: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    img: [
      {
        url: {
          type: String,
        },
        alt: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const projectModel = mongoose.model("project", ProjectSchema);

module.exports = projectModel;
