const mongoose = require("mongoose");

const callSchema = new mongoose.Schema({
  callerName: String,
  callerNumber: String,
  receiverNumber: String,
  city: String,
  callDirection: Boolean,
  callStatus: Boolean,
  callDuration: Number,
  callCost: Number,
  callStartTime: Date,
  callEndTime: Date
}, { strict: false });

module.exports = mongoose.model("Call", callSchema);