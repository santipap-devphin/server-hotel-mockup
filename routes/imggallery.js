const express = require('express');
const router = express.Router();
const imggalleryController = require('../controller/imggalleryController');

router.get("/exper" , imggalleryController.imgGalleryExper);
router.get("/tagsall" , imggalleryController.imgTagAll);
router.get("/all" , imggalleryController.getimgGallery);
router.get("/forid/:id" , imggalleryController.getimgGalleryByID);
router.delete("/del/:id" , imggalleryController.delImgGallery);

module.exports = router;