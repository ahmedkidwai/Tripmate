const router = require('express').Router();
const Ticket = require('../models/ticket.model');

router.route('/').get((req, res) => {
  Ticket.find()
    .then(tickets => res.json(tickets))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/add').post((req, res) => {
  const ticket = req.body;

  const newTicket = new Ticket({ticket});

  newTicket
    .save()
    .then(() => res.json('Ticket added!'))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/:id').get((req, res) => {
  Ticket.findById(req.params.id)
    .then(tickets => res.json(tickets))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/:id').delete((req, res) => {
  Ticket.findByIdAndDelete(req.params.id)
    .then(() => res.json('Ticket deleted.'))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/update_method/:id').post((req, res) => {
  Ticket.findById(req.params.id)
    .then(ticket => {
      ticket.properties.transportType = req.body.transportType;

      ticket
        .save()
        .then(() => res.json('Ticket transport type updated!'))
        .catch(err => res.status(400).json(`Error: ${err}`));
    })
    .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/update_start/:id').post((req, res) => {
  Ticket.findById(req.params.id)
    .then(ticket => {
      ticket.properties.start = req.body.start;

      ticket
        .save()
        .then(() => res.json('Ticket start updated!'))
        .catch(err => res.status(400).json(`Error: ${err}`));
    })
    .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/update_end/:id').post((req, res) => {
  Ticket.findById(req.params.id)
    .then(ticket => {
      ticket.properties.end = req.body.end;

      ticket
        .save()
        .then(() => res.json('Ticket end updated!'))
        .catch(err => res.status(400).json(`Error: ${err}`));
    })
    .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/update_confirmation_number/:id').post((req, res) => {
  Ticket.findById(req.params.id)
    .then(ticket => {
      ticket.properties.confirmationNumber = req.body.confirmationNumber;

      ticket
        .save()
        .then(() => res.json('Ticket confirmation number updated!'))
        .catch(err => res.status(400).json(`Error: ${err}`));
    })
    .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/update_notes/:id').post((req, res) => {
  Ticket.findById(req.params.id)
    .then(ticket => {
      ticket.properties.notes = req.body.notes;

      ticket
        .save()
        .then(() => res.json('Ticket notes updated!'))
        .catch(err => res.status(400).json(`Error: ${err}`));
    })
    .catch(err => res.status(400).json(`Error: ${err}`));
});

module.exports = router;
