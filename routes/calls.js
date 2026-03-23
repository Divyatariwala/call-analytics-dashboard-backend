const express = require("express");
const Call = require("../models/Call");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

/* ---------------- GET ALL CALLS (NO PAGINATION) ---------------- */
router.get("/", authMiddleware, async (req, res) => {
  try {
    const city = req.query.city;
    const number = req.query.number;

    let query = {};

    if (city) query.city = city;
    if (number) query.callerNumber = number;

    const calls = await Call.find(query)
      .sort({ callStartTime: -1 });

    res.json(calls);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;