'use strict';

const Song = require('../model/song');
const bodyParser = require('body-parser');
const errorHandler = require('../lib/error-handler');
const bearerAuthMiddleware = require('../lib/bearer-auth-middleware');
const lyricFetcher = require('../lib/lyric-fetcher-middleware');

const ERROR_MESSAGE = 'An Error Occured';

module.exports = router => {
  router.route('/song/:_id?')
    .post(bearerAuthMiddleware, bodyParser, lyricFetcher, (req, res) => {
      req.body.userId = req.user._id;
      return new Song(req.body).save()
        .then(createdSong => res.status(201).json(createdSong))
        .catch(error => errorHandler(error, res));
    })

    .delete(bearerAuthMiddleware, (req, res) => {
      return Song.findById(req.params._id)
        .then(song => {
          if(song.userId.toString() === req.user._id) {
            song.remove();
            return res.sendStatus(204);
          }

          return errorHandler(new Error(ERROR_MESSAGE), res);
        })
        .catch(err => errorHandler(err, res));
    });
};