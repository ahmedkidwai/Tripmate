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
  },
  {
    timestamps: true,
  },
);

const Hotel = mongoose.model('Hotel', hotelScheme);
module.exports = Hotel;
