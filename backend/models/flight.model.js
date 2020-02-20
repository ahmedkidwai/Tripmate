const mongoose = require('mongoose');

const {Schema} = mongoose;

const flightScheme = new Schema({
  type: String,
  items: {
    type: Object,
    properties: {
      departure: {
        type: Object,
        properties: {
          airport: {
            type: Object,
            properties: {
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
      },
      arrival: {
        type: Object,
        properties: {
          airport: {
            type: Object,
            properties: {
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
      },
      lastUpdatedUtc: {
        type: String,
      },
      number: {
        type: String,
        required: true,
        trim: true,
      },
      status: {
        type: String,
      },
      aircraft: {
        type: Object,
        properties: {
          reg: {
            type: String,
          },
          model: {
            type: String,
          },
        },
      },
      airline: {
        type: Object,
        properties: {
          name: {
            type: String,
          },
        },
      },
    },
  },
});

const Flight = mongoose.model('Flight', flightScheme);
module.exports = Flight;
