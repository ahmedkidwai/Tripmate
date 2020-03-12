const mongoose = require('mongoose');

const {Schema} = mongoose;

const toDoItemScheme = new Schema(
  {
    content: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
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

const toDoListScheme = new Schema(
  {
    tripId: {
      type: mongoose.ObjectId,
      unique: false,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
    },
    items: [toDoItemScheme],
  },
  {
    timestamps: true,
  },
);

const ToDoList = mongoose.model('ToDoList', toDoListScheme);
const ToDoItem = mongoose.model('ToDoItem', toDoItemScheme);

module.exports = {
  ToDoList,
  ToDoItem,
};
