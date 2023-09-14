const { Router } = require("express");
const {
  signup,
  googleLoginSuccess,
  googleLoginFailure,
  googleLogout,
} = require("../routeHandlers/handleAuthRoutes");
const passport = require("passport");

const router = Router();

// email and signup
router.post("/signup", signup);

// google login success
router.get("/callback/success", googleLoginSuccess);

// google login failure
router.get("/callback/failure", googleLoginFailure);

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
