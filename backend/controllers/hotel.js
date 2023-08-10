const Hotel = require('../models/Hotel');
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
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.param.id,
      { $set: req.body },
      { new: true }
    );
  } catch (error) {
    next(error);
  }
};

exports.getHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (err) {
    next(err);
  }
};

exports.getHotels = async (req, res, next) => {
  const { city, option, min, max } = req.query;
  try {
    //  api/hotels?city=Ha Noi&option=cheapestPrice&min=100&max=300
    const hotels = await Hotel.find({ city: { $regex: city, $options: 'i' } })
      .where(option)
      .gte(min || 1)
      .lte(max || 900);

    res.status(200).json({
      status: 'success',
      result: hotels.length,
      data: [...hotels],
    });
  } catch (err) {
    next(err);
  }
};

exports.sortBy = async (req, res, next) => {
  // asc : tang dang, giam dan: des
  // api/hotels/sortBy?sort=des&value=cheapestPrice&limit=2
  const { sort, limit, value } = req.query;
  let sortBy = sort === 'asc' ? value : `-${value}`;

  try {
    const hotels = await Hotel.find().sort(sortBy).limit(limit);
    res.status(200).json({
      status: 'success',
      result: hotels.length,
      data: [...hotels],
    });
  } catch (err) {
    next(err);
  }
};
exports.countByCity = async (req, res, next) => {
  try {
    const haNoiCount = await Hotel.countDocuments({ city: 'Ha Noi' });
    const daNangCount = await Hotel.countDocuments({ city: 'Da Nang' });
    const hcmCount = await Hotel.countDocuments({ city: 'Ho Chi Minh' });

    res.status(200).json({
      status: 'success',
      result: 3,
      data: [
        { city: 'Ha Noi', count: haNoiCount },
        { city: 'Ho Chi Minh', count: hcmCount },
        { city: 'Da Nang', count: daNangCount },
      ],
    });
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

    res.status(200).json({
      status: 'success',
      result: 5,
      data: [
        { type: 'hotel', count: hotelCount },
        { type: 'apartments', count: apartmentCount },
        { type: 'resorts', count: resortCount },
        { type: 'villas', count: villaCount },
        { type: 'cabins', count: cabinCount },
      ],
    });
  } catch (err) {
    next(err);
  }
};