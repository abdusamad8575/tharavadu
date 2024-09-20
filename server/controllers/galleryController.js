const Gallery = require('../models/galleryModel');
const fs = require('fs');
const path = require('path');

exports.uploadFiles = async (req, res) => {
  try {
    const files = req.files.map(file => ({
      filename: file.filename,
      path: file.path,
      mimetype: file.mimetype
    }));

    await Gallery.insertMany(files);
    res.status(201).json({ message: 'Files uploaded successfully!', files });
  } catch (error) {
    res.status(500).json({ error: 'Error uploading files.' });
  }
};

exports.getGallery = async (req, res) => {
  try {
    const gallery = await Gallery.find().sort({ createdAt: -1 });
    res.status(200).json(gallery);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching gallery.' });
  }
};

exports.getClientFetchGallery = async (req, res) => {
  console.log('getClientFetchGallery');
  
  try {
    const { page = 1, limit = 6 } = req.query; 
    const skip = (page - 1) * limit;

    const gallery = await Gallery.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const totalItems = await Gallery.countDocuments();

    res.status(200).json({
      gallery,
      totalPages: Math.ceil(totalItems / limit),
      currentPage: Number(page),
    });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching gallery.' });
  }
};

exports.deleteFile = async (req, res) => {
  try {
    const file = await Gallery.findById(req.params.id);
    if (!file) {
      return res.status(404).json({ error: 'File not found.' });
    }

    fs.unlinkSync(file.path);
    await Gallery.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'File deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting file.' });
  }
};
