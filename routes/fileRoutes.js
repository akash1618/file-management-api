// routes/fileRoutes.js

const express = require('express');
const router = express.Router();
const multer = require('multer');
const fileController = require('../controllers/fileController');
const authMiddleware = require('../middlewares/authMiddleware');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

router.post('/upload', authMiddleware.authenticate, upload.single('file'), fileController.uploadFile);
router.get('/list', authMiddleware.authenticate, fileController.listFiles);
router.delete('/delete/:fileName', authMiddleware.authenticate, fileController.deleteFile);
router.get('/search', authMiddleware.authenticate, fileController.searchFiles);

module.exports = router;
