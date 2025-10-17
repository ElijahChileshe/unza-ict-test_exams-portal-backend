import Upload from '../models/Upload.js';
import path from 'path';
import fs from 'fs';
import multer from "multer";
// import cloudinary from "cloudinary";
import dotenv from "dotenv";
import FileModel from "../models/File.js";
import stream from "stream";
import { v2 as cloudinary } from "cloudinary";


dotenv.config();
// Cloudinary setup
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Handle upload
export const uploadFile = async (req, res) => {
  try {
    const { courseName, courseCode, year, type } = req.body;
    const fileBuffer = req.file.buffer;

    // Upload file to Cloudinary
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: "raw", folder: "unza_files" },
      async (error, result) => {
        if (error) return res.status(500).json({ message: error.message });

        // Save metadata + file URL to MongoDB
        const newUpload = new Upload({
          courseName,
          courseCode,
          year,
          type,
          fileName: req.file.originalname,
          fileUrl: result.secure_url, // Cloudinary file URL
          uploadedAt: new Date(),
        });

        await newUpload.save();

        // Send response
        res.status(201).json({
          message: "File uploaded and saved successfully",
          data: newUpload,
        });
      }
    );

    // Pipe buffer to Cloudinary
    const bufferStream = new stream.PassThrough();
    bufferStream.end(fileBuffer);
    bufferStream.pipe(uploadStream);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Upload failed", error: error.message });
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
