const mongoose = require('mongoose');

const {Schema} = mongoose;

const flightScheme = new Schema({
  departure: {
    airport: {
      iata: {
        type: String,
      },
      name: {
        type: String,
      },
      shortName: {
        type: String,
      },
      municipalityName: {
        type: String,
      },
      countryCode: {
        type: String,
      },
    },
    scheduledTimeLocal: {
      type: String,
    },
    actualTimeLocal: {
      type: String,
    },
    gate: {
      type: String,
    },
  },
  arrival: {
    airport: {
      iata: {
        type: String,
      },
      name: {
        type: String,
      },
      shortName: {
        type: String,
      },
      municipalityName: {
        type: String,
      },
      countryCode: {
        type: String,
      },
    },
    scheduledTimeLocal: {
      type: String,
    },
    actualTimeLocal: {
      type: String,
    },
    gate: {
      type: String,
    },
  },
  lastUpdatedUtc: {
    type: String,
  },
  number: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: String,
  },
  aircraftModel: {
    type: String,
  },
  airline: {
    type: String,
  },
});

const Flight = mongoose.model('Flight', flightScheme);
module.exports = {Flight};
