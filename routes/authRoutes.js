const {authonticator} = require("../middileware/authonticator")
const {loginAuthenticator} = require("../middileware/login-authenticator")
const { Router } = require("express");
const {
  signup,
  logout,
  authenticationSuccess,
  signupFailure,
  login
} = require("../routeHandlers/handleAuthRoutes");
const passport = require("passport");

const router = Router();

// email and password signup route
router.post("/signup", signup);

router.get("/signup/failure",signupFailure)

router.post("/login", loginAuthenticator, login)

router.get("/authentication/success",authonticator,authenticationSuccess)

router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:5173/todo",
    failureRedirect: "callback/failure",
  })
);

router.get("/logout", logout);

module.exports = router;
