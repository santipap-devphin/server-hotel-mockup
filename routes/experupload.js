const express = require('express');
const router = express.Router();
const experController = require('../controller/experienceController');

router.post("/" , experController.experienceAdd)
router.post("/:id" , experController.experUPdate)

module.exports = router;