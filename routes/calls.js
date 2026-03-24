const express = require("express");
const Call = require("../models/Call");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

/* ---------------- GET ALL CALLS ---------------- */
router.get("/", authMiddleware, async (req, res) => {
  try {
    const { city, number } = req.query;

    let query = {};
    if (city) query.city = city;
    if (number) query.callerNumber = number;

    const calls = await Call.find(query).sort({ callStartTime: -1 });

    if (!calls || calls.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No calls found"
      });
    }

    res.status(200).json({
      success: true,
      count: calls.length,
      data: calls
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message
    });
  }
});

/* ---------------- GET SINGLE CALL ---------------- */
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const call = await Call.findById(req.params.id);

    if (!call) {
      return res.status(404).json({
        success: false,
        message: "Call not found"
      });
    }

    res.status(200).json({
      success: true,
      data: call
    });

  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Invalid call ID"
    });
  }
});

/* ---------------- CREATE CALL ---------------- */
router.post("/", authMiddleware, async (req, res) => {
  try {
    const newCall = new Call(req.body);
    await newCall.save();

    res.status(201).json({
      success: true,
      message: "Call created successfully",
      data: newCall
    });

  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Invalid data",
      error: err.message
    });
  }
});

/* ---------------- DELETE CALL ---------------- */
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const call = await Call.findByIdAndDelete(req.params.id);

    if (!call) {
      return res.status(404).json({
        success: false,
        message: "Call not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Call deleted successfully"
    });

  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Invalid call ID"
    });
  }
});

module.exports = router;