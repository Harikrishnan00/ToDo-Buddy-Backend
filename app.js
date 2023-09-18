require("dotenv").config();
const express = require("express");
require("./config/passport");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/authRoutes");
const userRoute = require("./routes/userRoutes");
const passport = require("passport");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("mongo connected"))
  .catch((err) => console.log(err));

app.use(cookieParser());
app.use(
  cookieSession({
    name: "google-auth-session",
    keys: [process.env.SECRET_KEY],
    maxAge: 1 * 60 * 60 * 10000,
    httpOnly: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,POST",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoute);
// app.use("/api/user", userRoute);

app.get("/", (req, res) => {
  res.send("he he he");
});

app.listen(PORT, () => console.log("conntected"));
