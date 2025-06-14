const express = require('express');
const multer = require('multer');
const HeroImage = require('../models/HeroImage');

const router = express.Router();

// Configure Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});

const upload = multer({ storage });

// Upload Hero Image
router.post('/', upload.single('heroImage'), async (req, res) => {
  const imageUrl = `http://localhost:5000/uploads/${req.file.filename}`;
  const newImage = new HeroImage({ imageUrl });
  await newImage.save();
  res.json({ message: 'Uploaded', imageUrl });
});

// Get All Hero Images
router.get('/', async (req, res) => {
  const images = await HeroImage.find().sort({ uploadedAt: -1 });
  res.json(images);
});

router.delete('/:id', async (req, res) => {
  try {
    const image = await HeroImage.findById(req.params.id);
    if (!image) return res.status(404).json({ message: 'Image not found' });

    const imagePath = path.join(__dirname, '../uploads', image.filename);

    fs.unlink(imagePath, async (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'File delete failed' });
      }

      await HeroImage.findByIdAndDelete(req.params.id);
      res.json({ message: 'Image deleted' });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;
