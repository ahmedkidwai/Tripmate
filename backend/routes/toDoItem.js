const router = require('express').Router();
const ToDoItem = require('../models/toDoItem.model');

router.route('/').get((req, res) => {
  ToDoItem.find()
    .then(todoitems => res.json(todoitems))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/add').post((req, res) => {
  const {name} = req.body;

  const newToDoItem = new ToDoItem({name});

  newToDoItem
    .save()
    .then(() => res.json('New item added!'))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/:id').get((req, res) => {
  ToDoItem.findById(req.params.id)
    .then(todoitem => res.json(todoitem))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/:id').delete((req, res) => {
  ToDoItem.findByIdAndDelete(req.params.id)
    .then(() => res.json('Item deleted.'))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/update_name/:id').post((req, res) => {
  ToDoItem.findById(req.params.id)
    .then(todoitem => {
      todoitem.name = req.body.name;

      todoitem
        .save()
        .then(() => res.json('Item updated!'))
        .catch(err => res.status(400).json(`Error: ${err}`));
    })
    .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/update_done/:id').post((req, res) => {
  ToDoItem.findById(req.params.id)
    .then(todoitem => {
      todoitem.done = req.body.done;

      todoitem
        .save()
        .then(() => res.json('Item updated!'))
        .catch(err => res.status(400).json(`Error: ${err}`));
    })
    .catch(err => res.status(400).json(`Error: ${err}`));
});

module.exports = router;
