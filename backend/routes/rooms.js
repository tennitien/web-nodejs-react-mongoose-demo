const express = require('express');
const roomController = require('../controllers/room');
const { verifyAdmin } = require('../controllers/verifyToken');
const router = express.Router();

router.post('/:hotelid', verifyAdmin, roomController.createRoom);
router.put(
  '/availability/:id',
  verifyAdmin,
  roomController.updateRoomAvailability
);
router.put('/:id', verifyAdmin, roomController.updateRoom);
router.delete('/:id', verifyAdmin, roomController.deleteRoom);
// user
router.get('/detail/:id', roomController.getRoom);
router.get('/', roomController.getRooms);
module.exports = router;
