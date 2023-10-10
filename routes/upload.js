const express = require('express');
const router = express.Router();
const uploadThumb = require('../controller/uploadController')

router.post("/upthumbroom" , uploadThumb.uploadImgThumbRoom)
router.post("/upmutiroom" , uploadThumb.uploadMutiRoom)

module.exports = router;