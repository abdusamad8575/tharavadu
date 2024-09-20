
// const mongoose = require('mongoose');

// const gallerySchema = new mongoose.Schema({
//   filename: { type: String, required: true },
//   path: { type: String, required: true },
//   mimetype: { type: String, required: true },
// }, { timestamps: true });

// module.exports = mongoose.model('Gallery', gallerySchema);

const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  filename: { type: String, required: true },
  path: { type: String, required: true },
  mimetype: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Gallery', gallerySchema);
