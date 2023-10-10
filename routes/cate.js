const express = require('express');
const router = express.Router();
const cateController = require('../controller/categoryController');

router.get("/all" , cateController.getCateAll);
router.get("/alls" , cateController.getCateAlls);

router.post("/add" , cateController.cateAdd);

router.post("/del" , cateController.delCategory);

module.exports = router;