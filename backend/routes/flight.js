const router = require('express').Router();
const Flight = require('../models/flight.model');

router.route('/').get((req, res) => {
  Flight.find()
    .then(flights => res.json(flights))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/add').post((req, res) => {
  const flight = req.body;

  const newFlight = new Flight({flight});

  newFlight
    .save()
    .then(() => res.json('Flight added!'))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/:id').get((req, res) => {
  Flight.findById(req.params.id)
    .then(flights => res.json(flights))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/:id').delete((req, res) => {
  Flight.findByIdAndDelete(req.params.id)
    .then(() => res.json('Flight deleted.'))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/update_flight/:id').post((req, res) => {
  Flight.findById(req.params.id)
    .then(flight => {
      flight = req.body;

      flight
        .save()
        .then(() => res.json('Flight updated!'))
        .catch(err => res.status(400).json(`Error: ${err}`));
    })
    .catch(err => res.status(400).json(`Error: ${err}`));
});

module.exports = router;
