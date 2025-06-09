const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Notice = require('../models/Notice');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// Upload notice
router.post('/', auth, upload.single('file'), async (req, res) => {
  const { title, content, status } = req.body;
  const fileUrl = req.file ? `/uploads/${req.file.filename}` : '';


  if (!title || !content) {
    return res.status(400).json({ message: 'Title and content are required.' });
  }

  try {
    const notice = new Notice({
      title,
      content,
      status: status || 'Published',
      postedBy: req.user.id,
      dorm: 'Dorm1',
      fileUrl
    });

    await notice.save();
    res.status(201).json({ message: 'Notice uploaded successfully.', notice });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to upload notice' });
  }
});

router.put('/:id', auth, upload.single('file'), async (req, res) => {
  const { title, content, status } = req.body;
  const update = { title, content, status };
  if (req.file) update.fileUrl = `/uploads/${req.file.filename}`;


  const updated = await Notice.findByIdAndUpdate(req.params.id, update, { new: true });
  res.json({ message: 'Notice updated', notice: updated });
});

router.delete('/:id', auth, async (req, res) => {
  await Notice.findByIdAndDelete(req.params.id);
  res.json({ message: 'Notice deleted' });
});

// Get all notices by dorm
router.get('/', auth, async (req, res) => {
  try {
    const notices = await Notice.find({ dorm: 'Dorm1' }).sort({ createdAt: -1 });
    res.json(notices);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching notices' });
  }
});

// Public route to get published notices
router.get('/public', async (req, res) => {
  try {
    const notices = await Notice.find({ status: 'Published' }).sort({ createdAt: -1 });
    res.json(notices);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch notices' });
  }
});


module.exports = router;
