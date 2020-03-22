const router = require('express').Router();
const {Event} = require('../models/event.model');

router.route('/').get((req, res) => {
  Event.find()
    .then(events => res.json(events))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/add').post((req, res) => {
  const {event} = req.body;

  const newEvent = new Event(event);

  newEvent
    .save()
    .then(() => res.status(201).json('Event added!'))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/:id').get((req, res) => {
  Event.findById(req.params.id)
    .then(event => res.json(event))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/:id').delete((req, res) => {
  Event.findByIdAndDelete(req.params.id)
    .then(() => res.json('Event deleted.'))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/update/:id').post((req, res) => {
  Event.findById(req.params.id)
    .then(event => {
      if (req.body.title) {
        event.title = req.body.title;
      }
      if (req.body.description) {
        event.description = req.body.description;
      }
      if (req.body.start) {
        event.start = req.body.start;
      }
      if (req.body.end) {
        event.end = req.body.end;
      }
      if (req.body.location) {
        event.location = req.body.location;
      }
      if (req.body.cost) {
        event.cost = req.body.cost;
      }

      event
        .save()
        .then(() => res.json('Event updated!'))
        .catch(err => res.status(400).json(`Error: ${err}`));
    })
    .catch(err => res.status(400).json(`Error: ${err}`));
});

module.exports = router;
