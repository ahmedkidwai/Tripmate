const router = require('express').Router();
const {Ticket} = require('../models/ticket.model');

router.route('/').get((req, res) => {
  Ticket.find()
    .then(tickets => res.json(tickets))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/add').post((req, res) => {
  const ticket = req.body;

  const newTicket = new Ticket(ticket);

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

router.route('/update/:id').post((req, res) => {
  Ticket.findById(req.params.id)
    .then(ticket => {
      if (req.body.transportType) {
        ticket.transportType = req.body.transportType;
      }
      if (req.body.start) {
        ticket.start = req.body.start;
      }
      if (req.body.end) {
        ticket.end = req.body.end;
      }
      if (req.body.confirmationNumber) {
        ticket.confirmationNumber = req.body.confirmationNumber;
      }
      if (req.body.notes) {
        ticket.notes = req.body.notes;
      }

      ticket
        .save()
        .then(() => res.json('Ticket updated!'))
        .catch(err => res.status(400).json(`Error: ${err}`));
    })
    .catch(err => res.status(400).json(`Error: ${err}`));
});

module.exports = router;
