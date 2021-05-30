const jwt = require("jsonwebtoken");
const passport = require("passport");
const User = require("../model/User");

const { ExtractJwt } = require("passport-jwt");
const JwtStrategy = require("passport-jwt").Strategy;

const TOKEN_SECRET = "TOKEN_SECRET";
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken("Authorization"),
  secretOrKey: TOKEN_SECRET,
  passReqToCallback: true,
};

passport.use(
  "jwt",
  new JwtStrategy(opts, async (req, jwt_payload, done) => {
    try {
      const user = await User.findById(jwt_payload.data);
      if (user) {
        return done(null, user);
      }
      return done({ status: 201, message: "Tai khoan khong ton tai" }, false);
    } catch (error) {
      return done(error.message, false);
    }
  })
);

passport.serializeUser(function (payload, done) {
  done(null, payload);
});

passport.deserializeUser(function (payload, done) {
  done(null, payload);
});
