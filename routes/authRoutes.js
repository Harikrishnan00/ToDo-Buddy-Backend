const {authorization} = require("../middileware/authorization")
const { Router } = require("express");
const {
  signup,
  googleLogout,
  authenticationSuccess,
  signupFailure
} = require("../routeHandlers/handleAuthRoutes");
const passport = require("passport");

const router = Router();

// email and signup
router.post("/signup", signup);

router.get("/signup/failure",signupFailure)

router.get("/authentication/success",authorization,authenticationSuccess)

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

router.get("/google/logout", googleLogout);

module.exports = router;
