'use strict';

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
  watson_user.profile({
    content: req.captionText,
    content_type: 'text/plain',
    consumption_preferences: true,
  }, (err, data) => {
    if (err) {
      errorHandler(err, res);
    } else {
      req.watsonData = data;
      next();
    }
  });
};