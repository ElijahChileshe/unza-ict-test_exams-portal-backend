import mongoose from 'mongoose';

const uploadSchema = new mongoose.Schema({
    fileName: { type: String, required: true },          // Original file name
    fileUrl: { type: String, required: true },            // Cloudinary URL
    year: { type: String, required: true },               // e.g., "1st Year"
    type: { type: String, required: true },               // "Test" or "Exam"
    courseName: { type: String, required: true },         // e.g., "Computer Networks"
    courseCode: { type: String, required: true },         // e.g., "CS303"
    uploadDate: { type: Date, default: Date.now },        // Auto timestamp
  });
  

const Upload = mongoose.model('Upload', uploadSchema);
export default Upload;
