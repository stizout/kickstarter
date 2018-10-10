const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');
const users = require('./routes/userRoutes');
const campaigns = require('./routes/campaignRoutes');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// MY DATABASE

const db = require('../config/keys').mongoURI

// CONNECT TO DB

mongoose.connect(db).then(() => {
  console.log('Database is Connected');
}).catch(err => console.log('error with connection.', err));

app.use(passport.initialize());
require('../config/passport')(passport)

// Routes 
app.use('/api/users', users);
app.use('/api/campaigns', campaigns)

// Serve static assets when in production
if(process.env.NODE_ENV === 'production') {
  app.use(express.static('../build'));
  app.get('*', (req, res) => {
    res.sendfile(path.resolve(__dirname, 'build', 'index.html'));
  });
}
app.listen(4000, () => console.log('Server Started'));