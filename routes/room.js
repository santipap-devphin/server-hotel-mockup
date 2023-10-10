const express = require('express');
const router = express.Router();
const roomController = require('../controller/roomController')


router.get("/" , roomController.getRoomCate);
router.post("/roomid/:id" , roomController.getRoomPerID);
router.get("/amenities" , roomController.getAmen);
router.get("/facilities" , roomController.getFacilities);
router.get("/all" , roomController.roomAllData);
router.delete("/delete/:id" , roomController.delRoomPerID)



module.exports = router;