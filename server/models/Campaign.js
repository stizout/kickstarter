const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CampaignSchema = new Schema({
  title: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  description: String,
  fullyFunded: Number,
  donation: Number,
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      }
    }
  ],
  endDate: Date,
  video: String,
  category: String,
});

module.exports = Campaign = mongoose.model('campaigns', CampaignSchema);