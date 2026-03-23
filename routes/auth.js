const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");

const router = express.Router();

/* ---------------- SIGNUP ---------------- */
router.post(
  "/signup",
  [
    body("name")
      .trim()
      .notEmpty().withMessage("Name is required")
      .isLength({ min: 3 }).withMessage("Name must be at least 3 characters"),

    body("email")
      .isEmail().withMessage("Invalid email")
      .normalizeEmail(),

    body("password")
      .isLength({ min: 6 }).withMessage("Password must be at least 6 characters")
  ],
  async (req, res) => {
    try {
      // VALIDATION CHECK
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          msg: errors.array()[0].msg
        });
      }

      const { name, email, password } = req.body;

      // CHECK EXISTING USER
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ msg: "User already exists" });
      }

      // HASH PASSWORD
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = new User({
        name,
        email,
        password: hashedPassword
      });

      await newUser.save();

      res.status(201).json({
        msg: "User registered successfully"
      });

    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: "Server error" });
    }
  }
);


/* ---------------- LOGIN ---------------- */
router.post(
  "/login",
  [
    body("email")
      .notEmpty().withMessage("Email is required")
      .isEmail().withMessage("Invalid email")
      .normalizeEmail(),

    body("password")
      .notEmpty().withMessage("Password is required")
  ],
  async (req, res) => {
    try {
      // VALIDATION CHECK
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          msg: errors.array()[0].msg
        });
      }

      const { email, password } = req.body;

      // CHECK USER
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }

      // CHECK PASSWORD
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid password" });
      }

      // GENERATE TOKEN
      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      res.json({
        token,
        user: {
          id: user._id,
          email: user.email,
          role: user.role
        }
      });

    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: "Server error" });
    }
  }
);

module.exports = router;