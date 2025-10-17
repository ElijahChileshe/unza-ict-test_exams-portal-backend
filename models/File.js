import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({
  year: String,
  type: String,
  courseName: String,
  courseCode: String,
  filePath: String,
  uploadedAt: { type: Date, default: Date.now }
});

export default mongoose.model('File', fileSchema);
