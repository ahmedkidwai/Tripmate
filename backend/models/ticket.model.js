const mongoose = require('mongoose');

const {Schema} = mongoose;

const ticketScheme = new Schema(
  {
    ticket: {
      type: Object,
      properties: {
        transportType: {
          type: String,
          required: true,
        },
        start: {
          type: Object,
          properties: {
            location: {
              type: String,
              required: true,
              trim: true,
            },
            date: {
              type: String,
              required: true,
              trim: true,
            },
          },
        },
        end: {
          type: Object,
          properties: {
            location: {
              type: String,
              required: true,
              trim: true,
            },
            date: {
              type: String,
              required: true,
              trim: true,
            },
          },
        },
        confirmationNumber: {
          type: String,
          trim: true,
        },
        notes: {
          type: String,
        },
      },
    },
  },
  {
    timestamps: true,
  },
);
const Ticket = mongoose.model('Ticket', ticketScheme);
module.exports = Ticket;
