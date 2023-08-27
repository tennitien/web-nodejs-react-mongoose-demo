const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: { type: String, required: true },
  phone: { type: String, required: true }, //
  email: { type: String, required: true, unique: true },
  isAdmin: { type: Boolean, default: false },
  img:{type:String}
});

module.exports = mongoose.model('User', UserSchema);
