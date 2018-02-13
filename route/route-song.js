'use strict';

const Song = require('../model/song');
const bodyParser = require('body-parser');
const errorHandler = require('../lib/error-handler');
const bearerAuthMiddleware = require('../lib/bearer-auth-middleware');
const lyricFetcher = require('../lib/lyric-fetcher');

const ERROR_MESSAGE = 'Auth Failed';

module.exports = router => {
  router.route('/song/:_id?')
    .post(bearerAuthMiddleware, bodyParser, (req, res) => {
      lyricFetcher(req.body.artist, req.body.title, (err, lyrics) => {
        req.body.lyrics = lyrics;
      });

      return new Song(req.body).save()
        .then(createdSong => res.status(201).json(createdSong))
        .catch(error => errorHandler(error, res));
    })

    .delete(bearerAuthMiddleware, (req, res) => {
      return Song.findById(req.params.id)
        .then(song => {
          if(song.userId.toString() === req.user._id)
        })
    })
};
