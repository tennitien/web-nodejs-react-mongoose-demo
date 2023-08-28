const express = require('express');

const hotelController = require('../controllers/hotel');
const { verifyAdmin } = require('../controllers/verifyToken');

const router = express.Router();

router.post('/', verifyAdmin, hotelController.createHotel);
router.put('/:id', verifyAdmin, hotelController.updatedHotel);
// router.put("/:id",  hotelController.updatedHotel);
router.delete('/:id', verifyAdmin, hotelController.deleteHotel);
// router.get('/:id', verifyAdmin, hotelController.deleteHotel);
// router.get("/find/:id", getHotel);

router.get('/', hotelController.getHotels);
router.get('/detail/:id', hotelController.getHotelById);
router.get('/countByCity', hotelController.countByCity);
router.get('/countByType', hotelController.countByType);
router.get('/sortBy', hotelController.sortBy);
router.get('/room/:hotelid', hotelController.getHotelRooms);

module.exports = router;
// app.use('/api/hotels', hotelsRoute);
