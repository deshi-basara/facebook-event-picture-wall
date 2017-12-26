var express = require('express');
var request = require('request');
var router = express.Router();

var config = require('../config');

/* POST auth listing. */
router.get('/:shortLiveToken', function(req, res, next) {
  // valid request?
  if (!req.params.shortLiveToken || typeof req.params.shortLiveToken !== 'string') {
    return res.status(500).send('InvalidRequest');
  }

  // fetch long live token from facebook api
  var tokenRequestUrl = 'https://graph.facebook.com/oauth/access_token?grant_type=fb_exchange_token&client_id='+ config.appId +'&client_secret='+ config.appSecret +'&fb_exchange_token='+ req.params.shortLiveToken;
  request.get(tokenRequestUrl, function(error, tokenResponse, body) {
    if (error) {
      return res.status(500).send(error);
    }

    res.send(body);
  });
});

module.exports = router;
