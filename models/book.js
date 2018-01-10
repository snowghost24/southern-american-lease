const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AutoEntrySchema = new Schema({
  vin: { type: String, unique : true, required: true },
  make: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  lastsix: { type: String, required: true },
  synopsis: String,
  date: { type: Date, default: Date.now }

});

const AutoEntry = mongoose.model("AutoEntry", AutoEntrySchema);

module.exports = AutoEntry;
