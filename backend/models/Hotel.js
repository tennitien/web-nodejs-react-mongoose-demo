const mongoose = require('mongoose');
/*
name: Tên của khách sạn
type: Loại khách sạn (Hotel, Apartments, Resorts, Villas, Cabins)
city: Thành phố của khách sạn đó
address: Địa chỉ cụ thể của khách sạn
distance: Khoảng cách từ khách sạn đến trung tâm thành phố
photos: Danh sách các link ảnh của khách sạn đó
desc: Giới thiệu về khách sạn
rating: Đánh giá về khách sạn đó (trong khoảng 0 -> 5 điểm)
featured: Khách sạn có hỗ trợ các tiện ích khác không
rooms: Danh sách các phòng thuộc khách sạn này
*/

const HotelSchema = new mongoose.Schema({
  address: { type: String, require: true },
  cheapestPrice: { type: Number, require: true },
  city: { type: String, require: true },
  desc: { type: String, require: true },
  distance: { type: String, require: true },
  featured: { type: Boolean, require: true },
  name: { type: String, require: true },
  photos: { type: [String], require: true },
  rooms: { type: [String], require: true },
  title: { type: String, require: true },
  type: { type: String, require: true },
  rating: { type: Number, mix: 0, max: 5 },
});

module.exports = mongoose.model('Hotels', HotelSchema);
