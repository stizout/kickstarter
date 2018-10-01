const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

const campaignValidator = require('../../validation/campaign');
const Campaign = require('../models/Campaign');

router.get('/current', (req, res) => {
  res.json({msg: 'The Current Campaigns router is working... kinda....'})
});

router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {
  const { title, description, fullyFunded, endDate, video, category} = req.body
  const { errors, isValid } = campaignValidator(req.body)
  if(!isValid) {
    return res.status(400).json(errors)
  }

  Campaign.findOne({user: req.user.id}).then(campaign => {
    if(campaign) {
      return res.status(400).json({msg: 'You Already have a campaign'});
    }
    let newCampaign = {
      title,
      user: req.user.id,
      description,
      fullyFunded,
      endDate,
      video,
      category
    }
    new Campaign(newCampaign).save().then(campaign => res.json(campaign));
  });
});

module.exports = router