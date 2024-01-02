// fileUpload.js
import multer from 'multer';
import path from 'path';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv'

dotenv.config();

const uri = process.env.live_db;
const client = new MongoClient(uri);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
});

const uploadSingle = async (req, res, next) => {
  try {
    await upload.single('image')(req, res);

    // Save file details to MongoDB
    await client.connect();
    const database = client.db('images');
    const collection = database.collection('file');
    const result = await collection.insertOne({
      filename: req.file.filename,
      path: req.file.path,
      // Add other file details as needed
    });

    console.log('File details saved to MongoDB:', result.insertedId);
    next();
  } catch (err) {
    console.error('Error uploading file:', err);
    res.status(500).json({ error: err.message });
  } finally {
    await client.close();
  }
};

export default uploadSingle;
