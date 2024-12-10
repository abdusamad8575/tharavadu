const express = require('express');
const { upload } = require('../middlewares/multer');
const { registerUser,getUsers, downloadUsersExcel, downloadUserPDF,downloadAllUserPDFs,updateUserDetails} = require('../controllers/userController');
const router = express.Router();



router.post('/userDetails', upload.single('photo'), registerUser);
router.get('/users', getUsers); 
router.get('/users/download/excel', downloadUsersExcel); 
router.get('/users/:id/download/pdf', downloadUserPDF);
router.get('/users/download/all-pdfs', downloadAllUserPDFs);
router.put('/users/:id', upload.single('photo'), updateUserDetails);


module.exports = router;
