import Upload from '../models/Upload.js';
import path from 'path';
import fs from 'fs';

export const uploadFile = async (req, res) => {
  try {
    const { year, type } = req.body;
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    const newUpload = new Upload({
      filename: req.file.originalname,
      filepath: `/uploads/${req.file.filename}`,
      year,
      type,
    });
    await newUpload.save();

    res.json({ message: 'File uploaded successfully', file: newUpload });
  } catch (error) {
    res.status(500).json({ error: 'Upload failed' });
  }
};

export const getUploads = async (req, res) => {
  try {
    const { year } = req.query;
    const query = year ? { year: new RegExp(`^${year}$`, 'i') } : {};
    const uploads = await Upload.find(query).sort({ uploadDate: -1 });
    res.json(uploads);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch files' });
  }
};

export const downloadFile = (req, res) => {
  const filePath = path.join('src/uploads', req.params.filename);
  if (!fs.existsSync(filePath)) return res.status(404).send('File not found');
  res.download(filePath);
};
