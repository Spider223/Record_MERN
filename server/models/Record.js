const mongoose = require("mongoose");

const RecordSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: [true, "most provide name"],
    trim: true,
  },
  position: {
    type: String,
    // required: [true, "most provide position"],
    trim: true,
  },
  level: {
    type: String,
    // required: [true, "most provide level"],
    trim: true,
  },
});

module.exports = mongoose.model("Record", RecordSchema);
