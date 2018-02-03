const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DealerEntrySchema = new Schema({
  email: { type: String, unique : true, required: true },
  phone: { type: String, required: true },
  name: { type: String, required: true },
  business:String
});

const AutoEntry = mongoose.model("dealerEntry", DealerEntrySchema);

module.exports = dealerEntry;
// exports.default= dealerEntry;
