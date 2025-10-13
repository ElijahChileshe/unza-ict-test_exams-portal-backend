import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import uploadRoutes from './routes/uploadRoutes.js';
import path from 'path';

dotenv.config();
const app = express();
connectDB();

app.use(cors());
app.use(express.json());

// Serve static uploaded files
app.use('/uploads', express.static(path.join('src/uploads')));

// Routes
app.use('/api/uploads', uploadRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
