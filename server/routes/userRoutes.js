const express = require('express');
const { upload } = require('../middlewares/multer');
const { registerUser } = require('../controllers/userController');
const router = express.Router();



router.post('/userDetails', upload.single('photo'), registerUser);

module.exports = router;
