const express = require('express');

const hotelController = require('../controllers/hotel');

const router = express.Router();

// //CREATE
// router.post("/", verifyAdmin, createHotel);

// //UPDATE
// router.put("/:id", verifyAdmin, updateHotel);
// //DELETE
// router.delete("/:id", verifyAdmin, deleteHotel);
// //GET

// router.get("/find/:id", getHotel);
// //GET ALL

router.get('/', hotelController.getHotels);
router.get('/countByCity', hotelController.countByCity);
router.get('/countByType', hotelController.countByType);
router.get('/sortBy', hotelController.sortBy);
// router.get("/room/:id", getHotelRooms);

module.exports = router;
