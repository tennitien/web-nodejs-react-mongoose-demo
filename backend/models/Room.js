const mongoose = require('mongoose');
/*
title: Tên loại phòng
price: Mức giá của loại phòng đó (tính theo ngày)
maxPeople: Số người tối đa
desc: Mô tả về loại phòng
roomNumbers: Danh sách số phòng của loại phòng này
*/
const RoomSchema = new mongoose.Schema({
  title: { type: String, require: true },
  price: { type: Number, require: true },
  maxPeople: { type: Number, require: true },
  desc: { type: String, require: true },
  roomNumbers: [Number],
});

module.exports = mongoose.model('Room', RoomSchema);
