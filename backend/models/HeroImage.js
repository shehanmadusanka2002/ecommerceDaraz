const mongoose = require('mongoose');

const HeroImageSchema = new mongoose.Schema({
  filename: String,
  uploadedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('HeroImage', HeroImageSchema);
