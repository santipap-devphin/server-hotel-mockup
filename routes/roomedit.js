const express = require('express');
const router = express.Router();
const roomController = require('../controller/roomController')

router.post("/edit/:id" , roomController.roomUpDate);

module.exports = router;