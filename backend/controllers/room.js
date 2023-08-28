const Room = require('../models/Room');
const Hotel = require('../models/Hotel');
const Transaction = require('../models/Transaction');
const createHttpError = require('http-errors');

exports.createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  const newRoom = new Room(req.body);

  try {
    const savedRoom = await newRoom.save();
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json(savedRoom);
  } catch (err) {
    next(err);
  }
};

exports.updateRoom = async (req, res, next) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedRoom);
  } catch (err) {
    next(err);
  }
};
exports.updateRoomAvailability = async (req, res, next) => {
  try {
    await Room.updateOne(
      { 'roomNumbers._id': req.params.id },
      {
        $push: {
          'roomNumbers.$.unavailableDates': req.body.dates,
        },
      }
    );
    res.status(200).json('Room status has been updated.');
  } catch (err) {
    next(err);
  }
};
exports.deleteRoom = async (req, res, next) => {
  const roomId = req.params.id;
  try {
    const transaction = await Transaction.findOne({ 'rooms.roomId': roomId });
    if (transaction)
      return next(
        createHttpError(404, 'The room with transactions cannot be deleted.')
      );

    await Room.findByIdAndDelete(roomId);
    await Hotel.updateMany({ rooms: roomId }, { $pull: { rooms: roomId } });

    res.status(200).json(`Room has been deleted.`);
  } catch (error) {
    next(error);
  }
};
// exports.deleteRoom = async (req, res, next) => {
//   const hotelId = req.params.hotelid;
//   const roomId=req.params.roomid
//   try {
//     await Room.findByIdAndDelete(roomId);
//     try {
//       await Hotel.findByIdAndUpdate(hotelId, {
//         $pull: { rooms: roomId },
//       });
//     } catch (err) {
//       next(err);
//     }
//     res.status(200).json('Room has been deleted.');
//   } catch (err) {
//     next(err);
//   }
// };
// user
exports.getRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    res.status(200).json(room);
  } catch (err) {
    next(err);
  }
};
exports.getRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (err) {
    next(err);
  }
};
