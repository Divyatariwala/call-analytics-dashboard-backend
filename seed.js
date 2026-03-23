const mongoose = require("mongoose");
const Call = require("./models/Call");
require("dotenv").config();

const data = require("./data/data.json");

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    await Call.deleteMany();
    await Call.insertMany(data);
    console.log("Data Inserted Successfully");
    process.exit();
  })
  .catch(err => console.log(err));