const express = require('express');
const router = express.Router();
const webController = require('../controller/webController');

router.get("/all" , webController.getAllData);
router.get("/once/:id" , webController.getDataPerID);
router.post("/update" , webController.webUpdate)


module.exports = router;