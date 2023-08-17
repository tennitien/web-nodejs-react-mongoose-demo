const express = require('express');
const roomController = require('../controllers/room');
const { verifyAdmin } = require('../controllers/verifyToken');
const router = express.Router();

router.post('/:hotelid', verifyAdmin, roomController.createRoom);
router.put('/availability/:id', roomController.updateRoomAvailability);
router.put('/:id', verifyAdmin, roomController.updateRoom);
router.delete('/:roomid/:hotelid', verifyAdmin, roomController.deleteRoom);

// user
router.get('/:id', roomController.getRoom);
router.get('/', roomController.getRooms);
module.exports = router;
