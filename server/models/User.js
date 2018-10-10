const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
  name: String,
  email: String,
  password: String,
  image: String,
  type: String,
  donations: [
    {
      campaign: {
        type: Schema.Types.ObjectId,
        ref: 'campaigns'
      },
      title: String,
      amount: Number,
    }
  ]
});

module.exports = User = mongoose.model('users', UserSchema);