'use strict';

const Auth = require('../model/auth');

const USERNAME = process.env.APP_WATSON_USERNAME;
const PASSWORD = process.env.APP_WATSON_PASSWORD;
const PersonalityInsightsV3 = require('watson-developer-cloud/personality-insights/v3');
const errorHandler = require('./error-handler');

const watson_user = new PersonalityInsightsV3({
  username: USERNAME,
  password: PASSWORD,
  version_date: '2016-10-19',
});

module.exports = (req, res, next) => {
  if(req.user.persona) {
    req.watsonData = JSON.parse(req.user.persona);
    return next();
  }
  Auth.findById(req.user._id)
    .populate('playlist') //returns user
    .then(user => {
      req.lyricText = '';
      user.playlist.map(v => req.lyricText += `${v.lyrics} `);
    })
    .then(() => {
      if(req.lyricText.split(' ').length < 100) return errorHandler(new Error('Lyrics Sample Not Long Enough')); //TODO add to error handler
      watson_user.profile({
        content: req.lyricText,
        content_type: 'text/plain',
        consumption_preferences: true,
      }, (err, data) => {
        if (err) {
          return errorHandler(err, res);
        } else {
          req.watsonData = data;
          next();
        }
      });
    });
};