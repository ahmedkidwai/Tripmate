const mongoose = require('mongoose');

const {Schema} = mongoose;

const hotelScheme = new Schema(
  {
    hotelname: {
      type: String,
      trim: true,
      minlength: 3,
      required: true,
    },
    tripId: {
      type: mongoose.ObjectId,
      unique: false,
    },
  },
  {
    timestamps: true,
  },
);

const Hotel = mongoose.model('Hotel', hotelScheme);
module.exports = Hotel;
