import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { uploadFile, getUploads, downloadFile } from '../controllers/uploadController.js';

const router = express.Router();

// Ensure uploads directory exists
const uploadDir = path.join('src/uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// Setup multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  },
});
const upload = multer({ storage });

// Routes
router.post('/', upload.single('file'), uploadFile);
router.get('/', getUploads);
router.get('/download/:filename', downloadFile);

export default router;
