const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;


passport.serializeUser(function(user, done) {
    done(null, user);
});
  
passport.deserializeUser(function(user, done) {
    done(null, user);
});


passport.use(new GoogleStrategy({
    clientID: '710985546517-n50r81tuqt8dhkhi5511tgnnsol9m7hh.apps.googleusercontent.com',
    clientSecret: 'qwsjCDMQ_L8eu4T6Ldbj6Buk',
    callbackURL: "/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
      return done(null, profile);
  }
));