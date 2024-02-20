// middleware/fileUploadMiddleware.js
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Specify the folder where uploaded files will be stored
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // Check file type (e.g., allow only images)
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only images are allowed.'));
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

module.exports = upload;
