const { Router } = require('express');
const router = Router();
const authorization = require("../middlewares/authorization");
const { getCategory, addCategory, deleteCategory ,updateCategory,getCategoryById,getEvents,getLatestEvents} = require('../controllers/categoryController');
const { upload } = require('../middlewares/multer');

router.get('/', getCategory);
router.get('/clientCategory', getEvents);  
router.get('/latest', getLatestEvents); 
router.get('/:id', getCategoryById);
router.post("/",upload.single('image'), addCategory);
router.patch("/",upload.single('image'),updateCategory);
router.delete("/:id", deleteCategory);

module.exports = router;
