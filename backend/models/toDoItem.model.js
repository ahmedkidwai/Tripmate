const mongoose = require('mongoose');

const {Schema} = mongoose;

const toDoItemScheme = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },

    done: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);
const ToDoItem = mongoose.model('ToDoItem', toDoItemScheme);
module.exports = ToDoItem;
