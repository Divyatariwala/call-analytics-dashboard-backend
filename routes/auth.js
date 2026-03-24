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
      const errors = validationResult(req);

      // Validation error
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: errors.array()[0].msg
        });
      }

      const { name, email, password } = req.body;

      // Check if user exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({
          success: false,
          message: "User already exists"
        });
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create user
      const newUser = new User({
        name,
        email,
        password: hashedPassword
      });

      await newUser.save();

      // Success
      res.status(201).json({
        success: true,
        message: "User registered successfully"
      });

    } catch (err) {
      console.error(err);
      res.status(500).json({
        success: false,
        message: "Server error"
      });
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
      const errors = validationResult(req);

      // Validation error
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: errors.array()[0].msg
        });
      }

      const { email, password } = req.body;

      // Check user
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found"
        });
      }

      // Check password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: "Invalid credentials"
        });
      }

      // Generate token
      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      // Success
      res.status(200).json({
        success: true,
        token,
        user: {
          id: user._id,
          email: user.email,
          role: user.role
        }
      });

    } catch (err) {
      console.error(err);
      res.status(500).json({
        success: false,
        message: "Server error"
      });
    }
  }
);

module.exports = router;