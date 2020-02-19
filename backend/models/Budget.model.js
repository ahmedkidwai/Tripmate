const mongoose = require('mongoose');

const {Schema} = mongoose;

const budgetScheme = new Schema(
  {
    budget: {
      type: Number,
      required: true,
      unique: false,
      min: 0,
    },
  },
  {
    timestamps: true,
  },
);
const Budget = mongoose.model('Budget', budgetScheme);
module.exports = Budget;
