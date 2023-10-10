const express = require('express');
const router = express.Router();
const imggalleryController = require('../controller/imggalleryController');

router.post("/" , imggalleryController.imgGalleryAdd);
router.post("/:id" , imggalleryController.imgGalleryUpdate);


module.exports = router;
