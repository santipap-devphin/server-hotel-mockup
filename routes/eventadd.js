const express = require('express');
const router = express.Router();
const eventsController = require('../controller/eventsController');

router.post("/add" , eventsController.addEvent);

router.get("/all" , eventsController.getEventsAll);

router.get("/cate" , eventsController.getCategoryEvents);

router.get("/once/:id" , eventsController.getEventsByID);

router.patch("/once/:id" , eventsController.eventsUpdate);

router.delete("/del" , eventsController.delEvents);



module.exports = router;