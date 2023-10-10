const express = require('express');
const router = express.Router();
const experController = require('../controller/experienceController');

router.get("/type" , experController.getExperTypeAll)
router.get("/content" , experController.getExperContent);
router.get("/once/:id" , experController.getExperienceByID);
router.delete("/del/:id" , experController.delExperience);

module.exports = router;