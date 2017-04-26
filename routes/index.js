const express = require('express');
const router = express.Router();
// could use one line instead: const router = require('express').Router();
const tweetBank = require('../tweetBank');

router.get('/', function (req, res) {
    let tweets = tweetBank.list();
    res.render('index', { tweets: tweets, showForm: true});
});

// router.get('/stylesheets/style.css', function (req, res) {
//     res.sendFile('/Users/kaisinli/Desktop/FSA April 2017/Twitter.js/public/stylesheets/style.css');
// });

router.get('/users/:name', function (req, res) {
    let tweets = tweetBank.find({name:req.params.name}); //gives all tweets of user
    res.render('index',{ tweets: tweets, showForm: true, username: req.params.username} ); //puts tweet in html
});

router.post('/tweets', function(req, res, next) {
  var name = req.body.name;
  var text = req.body.text;
  tweetBank.add(name, text);
  res.redirect('/');    //tells browser to go to another location, where all tweets are listed
});

module.exports = router;