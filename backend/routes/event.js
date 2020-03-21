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

router.route('/update_title/:id').post((req, res) => {
  Event.findById(req.params.id)
    .then(event => {
      event.title = req.body.title;

      event
        .save()
        .then(() => res.json('Event title updated!'))
        .catch(err => res.status(400).json(`Error: ${err}`));
    })
    .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/update_description/:id').post((req, res) => {
  Event.findById(req.params.id)
    .then(event => {
      event.description = req.body.description;

      event
        .save()
        .then(() => res.json('Event description updated!'))
        .catch(err => res.status(400).json(`Error: ${err}`));
    })
    .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/update_start/:id').post((req, res) => {
  Event.findById(req.params.id)
    .then(event => {
      event.start = req.body.start;

      event
        .save()
        .then(() => res.json('Event start updated!'))
        .catch(err => res.status(400).json(`Error: ${err}`));
    })
    .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/update_end/:id').post((req, res) => {
  Event.findById(req.params.id)
    .then(event => {
      event.end = req.body.end;

      event
        .save()
        .then(() => res.json('Event end updated!'))
        .catch(err => res.status(400).json(`Error: ${err}`));
    })
    .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/update_location/:id').post((req, res) => {
  Event.findById(req.params.id)
    .then(event => {
      event.location = req.body.location;

      event
        .save()
        .then(() => res.json('Event location updated!'))
        .catch(err => res.status(400).json(`Error: ${err}`));
    })
    .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/update_cost/:id').post((req, res) => {
  Event.findById(req.params.id)
    .then(event => {
      event.cost = req.body.cost;

      event
        .save()
        .then(() => res.json('Event cost updated!'))
        .catch(err => res.status(400).json(`Error: ${err}`));
    })
    .catch(err => res.status(400).json(`Error: ${err}`));
});

module.exports = router;
