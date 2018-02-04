const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DealerEntrySchema = new Schema({
  email: { type: String, unique : true, required: true },
  tel: { type: String },
  name: { type: String, required: true },
  dealership:String,
  url:String,
});

const DealerEntry = mongoose.model("dealerEntry", DealerEntrySchema);

module.exports = DealerEntry;
// exports.default= dealerEntry;
