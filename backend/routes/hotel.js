const router = require('express').Router();
const Hotel = require('../models/hotel.model');

router.route('/').get((req, res) => {
  Hotel.find()
    .then(hotels => res.json(hotels))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/add').post((req, res) => {
  const {hotelname} = req.body;

  const newHotel = new Hotel({hotelname});

  newHotel
    .save()
    .then(() => res.json('Hotel added!'))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/:id').get((req, res) => {
  Hotel.findById(req.params.id)
    .then(hotels => res.json(hotels))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/:id').delete((req, res) => {
  Hotel.findByIdAndDelete(req.params.id)
    .then(() => res.json('Hotel deleted.'))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

// TODO: need to add other params like price, addr, etc.
router.route('/update_hotelname/:id').post((req, res) => {
  Hotel.findById(req.params.id)
    .then(hotels => {
      hotels.hotelname = req.body.hotelname;

      hotels
        .save()
        .then(() => res.json('Hotel updated!'))
        .catch(err => res.status(400).json(`Error: ${err}`));
    })
    .catch(err => res.status(400).json(`Error: ${err}`));
});

module.exports = router;
