// routes/auth.js
import express from "express";
import passport from "passport";
import bcrypt from "bcryptjs";
import { User } from "../models/User.js";

const router = express.Router();

//registration route
router.post("/register", (req, res) => {
  const { name, email, password, role } = req.body;

  User.findOne({ email: email }).then((user) => {
    if (user) {
      return res.status(400).json({ message: "Email already exists." });
    } else {
      const newUser = new User({
        name,
        email,
        password,
        role: role || "customer",
      });

      //hash password
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json({ error: err.message }));
        });
      });
    }
  });
});

//login route
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      return res.status(400).json({ message: info.message });
    }

    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.json({ user, message: "Logged in succesfully" });
    });
  })(req, res, next);
});

//logout route
router.get("/logout", (req, res) => {
  req.logout(() => {
    res.json({ message: "Logged out successfully" });
  });
});

export default router;
