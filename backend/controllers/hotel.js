const createHttpError = require('http-errors');
const Hotel = require('../models/Hotel');
const Room = require('../models/Room');
const Transaction = require('../models/Transaction');
// admin them>xoa>xem Hotel & Room **Update

exports.createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);

  try {
    const addHotel = await newHotel.save();
    res.status(200).json(addHotel);
  } catch (error) {
    next(error);
  }
};

// updateHotel
exports.updatedHotel = async (req, res, next) => {
  try {
    console.log('req.params.id :>> ', req.params.id);
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (error) {
    next(error);
  }
};
exports.deleteHotel = async (req, res, next) => {
  try {
    let hotel;
    try {
      hotel = await Transaction.findOne({ hotelId: req.params.id });
    } catch (error) {
      next(createHttpError(404, 'Transaction not found with hotel'));
    }

    if (hotel)
      return next(
        createHttpError(404, 'The hotel with transactions cannot be deleted.')
      );
    else {
      await Hotel.findByIdAndDelete(req.params.id);
      res.status(200).json('Hotel has been deleted.');
    }
  } catch (err) {
    next(err);
  }
};
//
exports.getHotelById = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (err) {
    next(err);
  }
};

exports.getHotels = async (req, res, next) => {
  const { city, option, min, max } = req.query;
  let hotels;
  try {
    //  api/hotels?city=Ha Noi&option=cheapestPrice&min=100&max=300
    if (city) {
      hotels = await Hotel.find({ city: { $regex: city, $options: 'i' } })
        .where(option)
        .gte(min || 1)
        .lte(max || 900);
    } else hotels = await Hotel.find();

    res.status(200).json([...hotels]);
  } catch (err) {
    next(err);
  }
};

exports.sortBy = async (req, res, next) => {
  // asc : tang dang, giam dan: des
  // api/hotels/sortBy?sort=des&value=cheapestPrice&limit=2
  const { sort, limit, value } = req.params;
  let sortBy = sort === 'asc' ? value : `-${value}`;

  try {
    const hotels = await Hotel.find().sort(sortBy).limit(limit);
    res.status(200).json([...hotels]);
  } catch (err) {
    next(err);
  }
};
exports.countByCity = async (req, res, next) => {
  try {
    const haNoiCount = await Hotel.find({ city: 'Ha Noi' }).count();
    const daNangCount = await Hotel.countDocuments({ city: 'Da Nang' });
    const hcmCount = await Hotel.countDocuments({ city: 'Ho Chi Minh' });
    res.status(200).json([
      { city: 'Ha Noi', count: haNoiCount },
      { city: 'Ho Chi Minh', count: hcmCount },
      { city: 'Da Nang', count: daNangCount },
    ]);
  } catch (err) {
    next(err);
  }
};

exports.countByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: 'hotel' });
    const apartmentCount = await Hotel.countDocuments({ type: 'apartment' });
    const resortCount = await Hotel.countDocuments({ type: 'resort' });
    const villaCount = await Hotel.countDocuments({ type: 'villa' });
    const cabinCount = await Hotel.countDocuments({ type: 'cabin' });

    res.status(200).json([
      { type: 'hotel', count: hotelCount },
      { type: 'apartments', count: apartmentCount },
      { type: 'resorts', count: resortCount },
      { type: 'villas', count: villaCount },
      { type: 'cabins', count: cabinCount },
    ]);
  } catch (err) {
    next(err);
  }
};

// rooms
exports.getHotelRooms = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.hotelid);
    const list = await Promise.all(
      hotel.rooms.map((room) => Room.findById(room))
    );

    res.status(200).json([...list]);
  } catch (error) {}
};
