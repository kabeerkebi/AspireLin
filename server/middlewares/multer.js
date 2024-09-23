import multer from "multer";
import path from "path";

// Multer Configuration for Disk Storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images"); // Store files in the 'public/images' folder
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Unique file name
  },
});

export const upload = multer({ storage: storage });
