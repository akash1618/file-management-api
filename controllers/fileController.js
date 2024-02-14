// controllers/fileController.js

const fs = require('fs-extra');
const path = require('path');

const uploadFile = async (req, res) => {
  try {
    if (!req.file || !req.file.originalname) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Validate file size (optional)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (req.file.size > maxSize) {
      return res.status(400).json({ error: 'File size exceeds the limit' });
    }

    // Validate file type (optional)
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (!allowedTypes.includes(req.file.mimetype)) {
      return res.status(400).json({ error: 'Invalid file type' });
    }

    const originalFileName = req.file.originalname;
    let targetFileName = originalFileName;
    let version = 1;

    while (await fs.pathExists(path.join(__dirname, '..', 'uploads', targetFileName))) {
      const extIndex = originalFileName.lastIndexOf('.');
      targetFileName = originalFileName.substring(0, extIndex) + `_${version}` + originalFileName.substring(extIndex);
      version++;
    }

    const tempPath = req.file.path;
    const targetPath = path.join(__dirname, '..', 'uploads', targetFileName);

    await fs.move(tempPath, targetPath, { overwrite: true });

    res.status(200).json({ message: 'File uploaded successfully', fileName: targetFileName });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

const listFiles = async (req, res) => {
  try {
    const files = await fs.readdir(path.join(__dirname, '..', 'uploads'));
    res.status(200).json({ files });
  } catch (error) {
    console.error('Error listing files:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

const deleteFile = async (req, res) => {
  try {
    const fileName = req.params.fileName;
    if (!fileName) {
      return res.status(400).json({ error: 'File name is required' });
    }

    const filePath = path.join(__dirname, '..', 'uploads', fileName);
    if (!(await fs.pathExists(filePath))) {
      return res.status(404).json({ error: 'File not found' });
    }

    await fs.unlink(filePath);

    res.status(200).json({ message: 'File deleted successfully' });
  } catch (error) {
    console.error('Error deleting file:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

const searchFiles = async (req, res) => {
  try {
    const searchTerm = req.query.q;
    if (!searchTerm) {
      return res.status(400).json({ error: 'Search term is required' });
    }

    const files = await fs.readdir(path.join(__dirname, '..', 'uploads'));

    const filteredFiles = files.filter(file => file.includes(searchTerm));
   
    if (filteredFiles.length == 0) {
      return res.status(404).json({ error: 'File not found' });
    }
    else {
      res.status(200).json({ files: filteredFiles });
    }
  } catch (error) {
    console.error('Error searching files:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  uploadFile,
  listFiles,
  deleteFile,
  searchFiles
};
