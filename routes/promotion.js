const express = require('express');
const router = express.Router();
const proController = require('../controller/promotionController');

router.post("/add" , proController.promotionAdd);

router.get("/all" , proController.getPromotion);

router.get("/once/:id" , proController.getPromotionOnce);

router.post("/update" , proController.promotionUpdate);

router.delete("/del" , proController.delPromotion);

module.exports = router;