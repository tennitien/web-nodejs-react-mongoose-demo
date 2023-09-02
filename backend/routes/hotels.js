const express = require('express');

const hotelController = require('../controllers/hotel');
const { verifyAdmin } = require('../controllers/verifyToken');

const router = express.Router();

router.post('/', verifyAdmin, hotelController.createHotel);
router.put('/:id', verifyAdmin, hotelController.updatedHotel);
router.delete('/:id', verifyAdmin, hotelController.deleteHotel);

// user
router.get('/', hotelController.getHotels);
router.get('/search', hotelController.searchHotel);
router.get('/detail/:id', hotelController.getHotelById);
router.get('/countByCity', hotelController.countByCity);
router.get('/countByType', hotelController.countByType);
router.get('/sortBy', hotelController.sortBy);
router.get('/room/:hotelid', hotelController.getHotelRooms);

module.exports = router;
// app.use('/api/hotels', hotelsRoute);
