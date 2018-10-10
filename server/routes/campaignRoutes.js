const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

const campaignValidator = require('../../validation/campaign');
const Campaign = require('../models/Campaign');

router.get('/', (req, res) => {
  Campaign.find().then(campaigns => {
    res.json(campaigns);
  })
});

router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {
  const { title, description, fullyFunded, endDate, video, category} = req.body
  const { errors, isValid } = campaignValidator(req.body)
  if(!isValid) {
    console.log('hit !isValid')
    return res.status(400).json(errors)
  }

  Campaign.findOne({user: req.user.id}).then(campaign => {
    if(campaign) {
      console.log('hit found campaign')
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

router.get('/:id', (req, res) => {
  Campaign.findById(req.params.id).then(campaign => {
    User.findById(campaign.user).then(user => {
      let campaignData = [campaign, user]
      res.json(campaignData);
    });
  });
});

router.post('/:id/donate', passport.authenticate('jwt', {session: false}), (req, res) => {
  const { amount } = req.body
  console.log(req.params.id, amount/100)
  Campaign.findById(req.params.id).then(campaign => {
    campaign.donation.unshift({user: req.user.id, amount: amount/100})
    campaign.save().then(campaign => {
      res.json(campaign);
    });
  });
});

router.post('/:id/like', passport.authenticate('jwt', {session: false}), (req, res) => {
  Campaign.findById(req.params.id).then(campaign => {
    if(campaign.likes.filter(like => like.user == req.user.id).length > 0) {
      let index = campaign.likes.map(like => like.user.toString()).indexOf(req.user.id)
      campaign.likes.splice(index, 1);
      campaign.save().then(campaign => {
        res.json(campaign);
      });
    } else {
      campaign.likes.push({user: req.user.id});
      campaign.save().then(campaign => {
        res.json(campaign);
      });
    }
  });
});

module.exports = router