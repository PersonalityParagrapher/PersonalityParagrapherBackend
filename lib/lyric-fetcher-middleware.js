'use strict';

const debug = require('debug')('http:lyricFetcher');
const lyricFetcher = require('lyrics-fetcher');

const errorHandler = require('./error-handler');

const ERROR_MESSAGE = 'An Error Occured';

module.exports = function(req, res, next) {
  let artist = req.body.artist;
  if(!artist) {
    debug(`Error: artist falsey`);
    return errorHandler(new Error(ERROR_MESSAGE), res);
  }
  
  let title = req.body.title;
  if(!title) {
    debug(`Error: title falsey`);
    return errorHandler(new Error(ERROR_MESSAGE), res);
  }

  debug('MADE IT');
  return lyricFetcher.fetch(artist, title, (err, lyrics) => {
    if(err) {
      debug(`Error: ${err.message}`);
      err.message = ERROR_MESSAGE;
      return errorHandler(err, res);
    }
    // API returns this string if invalid imformation is passed
    if(lyrics === `Sorry, We don't have lyrics for this song yet.`) {
      debug(`Error: No Lyrics!`);
      return errorHandler(new Error(ERROR_MESSAGE), res);
    }

    req.body.lyrics = lyrics;
    next();
  });
};
