var passport = require('passport');
const { google } = require('googleapis');
const mongoose = require('mongoose')
const codeSchema = require('../models/code.models')
const express = require('express');
const router = express.Router();
const url = require('url');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

const oauth2Client = new google.auth.OAuth2(
  process.env['GOOGLE_CLIENT_ID'],
  process.env['GOOGLE_CLIENT_SECRET'],
  process.env['REDIRECT_URI']
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env['GOOGLE_CLIENT_ID'],
      clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
      callbackURL: '/oauth2/redirect/google',
      scope: ['https://www.googleapis.com/auth/drive', 'profile'],
      passReqToCallback: true,
    },
    function verify(request, accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

router.get('/login', function (req, res, next) {
  res.render('login');
});
router.get('/login/federated/google', passport.authenticate('google'));

router.get(
  '/oauth2/redirect/google',
  async function data(req, res) {
    const qs = new url.URL(req.url, 'http://localhost:3000').searchParams;
    const { tokens } = await oauth2Client.getToken(qs.get('code'));
    console.log(tokens)
  codeSchema.create(tokens)
  },
  passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/login',
  })
);


router.post('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});
module.exports = router;
