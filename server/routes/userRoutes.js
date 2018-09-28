const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

const validateRegistration = require('../../validation/registration');
const validateLogin = require('../../validation/login');

// Test Route
router.get('/test', (req, res) => {
  res.json({msg: 'User Works'})
});

router.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  const { errors, isValid } = validateRegistration(req.body)

  if(!isValid) {
    return res.status(400).json(errors)
  }
  
  User.findOne({
    email
  }).then(user => {
    if(user) {
      return res.json({msg: 'Email already exists'});
    } else {
      let newUser = new User({
        name,
        email,
        password
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if(err) {
            throw err
          } else {
            newUser.password = hash;
            newUser.save().then(user => {
              res.json(user);
            }).catch(err => console.log('error with bcrypt', err));
          }
        });
      });
    }
  });
});


router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const { errors, isValid } = validateLogin(req.body)

  if(!isValid) return res.status(400).json(errors);

  User.findOne({
    email
  }).then(user => {
    if(!user) return res.status(400).json({msg: 'User Not Found'});

    bcrypt.compare(password, user.password).then(isMatch => {
      if(isMatch) {
        let payload = {
          id: user.id,
          name: user.name
        }
        jwt.sign(payload, keys.payloadKey, { expiresIn: 3600 }, (err, token) => {
          res.json({
            success: true,
            token: 'Bearer ' + token
          });
        });
      } else {
        return res.status(400).json({msg: 'Password Incorrect'});
      }
    });
  });
});


module.exports = router;