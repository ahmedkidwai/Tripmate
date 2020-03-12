const express = require('express');

const router = express.Router();
const {check, validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const auth = require('../middleware/auth');
// @route       GET api/auth
// @description Test Route
// @access      Public
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).send();
  }
});

// @route       Post api/auth
// @description Authenticate User && get Token
// @access      Public
router.post(
  '/',
  [
    check('email', 'Please provide a valid email').isEmail(),
    check('password', 'Password required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }

    const {email, password} = req.body;

    try {
      const user = await User.findOne({email});
      // See if a user exists
      if (!user) {
        res.status(400).json({error: [{msg: 'Invalid user or email'}]});
      }

      // compare if text password is same as stored encryped password
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        res.status(400).json({error: [{msg: 'Invalid user or email'}]});
      }
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {expiresIn: 36000},
        (err, token) => {
          if (err) throw err;
          res.json({token});
        },
      );
    } catch (err) {
      res.status(500).send('Server Error');
    }
    return '';
  },
);

module.exports = router;
