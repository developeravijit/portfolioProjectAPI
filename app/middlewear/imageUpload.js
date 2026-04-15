const multer = require("multer");

const File_type = {
  "image/png": "png",
  "image/jpg": "jpg",
  "image/jpeg": "jpeg",
  "image/avif": "avif",
  "image/webp": "webp",
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = File_type[file.mimetype];
    let uploadError = new Error("Invalid file type");

    if (isValid) {
      uploadError = null;
    }
    cb(uploadError, "uploads");
  },
  filename: (req, file, cb) => {
    const filename = file.originalname.split(" ").join("-");
    const extention = File_type[file.mimetype];
    cb(null, `${filename}-${Date.now}.${extention}`);
  },
});

const projectImg = multer({ storage: storage });

module.exports = projectImg;
