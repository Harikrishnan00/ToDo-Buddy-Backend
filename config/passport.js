const passport = require("passport")
const GoogleStrategy = require('passport-google-oauth20').Strategy;
  
const GoogleUser = require("../model/googleUserModel")

passport.serializeUser((user , done) => {
    done(null , user);
})

passport.deserializeUser(function(user, done) {
    done(null, user);
});
  
passport.use(new GoogleStrategy({
    clientID:process.env.GOOGLE_CLIENT_ID, 
    clientSecret:process.env.GOOGLE_CLIENT_SECRET, 
    callbackURL:"http://localhost:3001/api/auth/callback"
  },
  async function(request, accessToken, refreshToken, profile, done) {
    const userData = await GoogleUser.findOne({googleID:profile.id})
    if(userData){
      return done(null, userData);
    }else{
      const googleUser = new GoogleUser({
        email:profile.emails[0].value,
        googleID:profile.id
      })
      const userData =await googleUser.save()
      return done(null, userData);
    }
  }
));