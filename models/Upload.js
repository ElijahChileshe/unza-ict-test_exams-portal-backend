import mongoose from 'mongoose';

const uploadSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  filepath: { type: String, required: true },
  year: { type: String, required: true },
  type: { type: String, required: true }, // "Test" or "Exam"
  uploadDate: { type: Date, default: Date.now },
});

const Upload = mongoose.model('Upload', uploadSchema);
export default Upload;
