const router = require('express').Router();
const Budget = require('../models/Budget.model');

router.route('/').get((req, res) => {
  Budget.find()
    .then(budget => res.json(budget))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/add').post((req, res) => {
  const {budget} = req.body;

  const newBudget = new Budget({budget});

  newBudget
    .save()
    .then(() => res.json({data: 'Budget added.'}))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/:id').get((req, res) => {
  Budget.findById(req.params.id)
    .then(budget => res.json(budget))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/:id').delete((req, res) => {
  Budget.findByIdAndDelete(req.params.id)
    .then(() => res.json({data: 'Budget deleted.'}))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

module.exports = router;
