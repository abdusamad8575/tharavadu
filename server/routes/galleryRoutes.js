// // routes/galleryRoutes.js
// const express = require('express');
// const { upload } = require('../middlewares/multer');
// const galleryController = require('../controllers/galleryController');

// const router = express.Router();

// router.post('/upload', upload.array('files', 10), galleryController.uploadFiles);
// router.get('/', galleryController.getGallery);

// module.exports = router;


const express = require('express');
const { upload } = require('../middlewares/multer');
const galleryController = require('../controllers/galleryController');

const router = express.Router();

router.post('/', upload.array('images', 10), galleryController.uploadFiles);
router.get('/', galleryController.getGallery);
router.get('/clientFetch', galleryController.getClientFetchGallery);   
router.delete('/:id', galleryController.deleteFile);

module.exports = router;
