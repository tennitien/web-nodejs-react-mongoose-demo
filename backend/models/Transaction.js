// user: Username của người đặt phòng
// hotel: _Id của khách sạn đã đặt
// room: Danh sách các phòng đã đặt
// dateStart: Ngày nhận phòng
// dateEnd: Ngày trả phòng
// price: Chi phí
// payment: Hình thức thanh toán (Credit Card, Cash)
// status: Tình trạng (Booked, Checkin, Checkout)
const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  //   username: { type: String, required: true, unique: true },
  user: { type: mongoose.ObjectId, required: true, ref: 'User' },
  hotel: { type: mongoose.ObjectId, required: true, ref: 'Hotel' },
  room: [Number],
  dateStart: { type: Date, required: true },
  dateEnd: { type: Date, required: true },
  price: { type: Number, required: true },
  payment: { type: String, required: true },
  status: { type: String, required: true },
});

module.exports = mongoose.model('Transaction', TransactionSchema);
