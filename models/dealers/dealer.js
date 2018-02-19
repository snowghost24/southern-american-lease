const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DealerEntrySchema = new Schema({
  _id: Schema.Types.ObjectId,
  email: { type: String, unique : true, required: true },
  name: { type: String, required: true },
  dealership:{ type: String, required: true },
  address:{ type: String, required: true },
  city:{ type: String, required: true },
  state:{ type: String, required: true },
  zip:{ type: Number, required: true },
  tel: { type: String },
});

const DealerEntry = mongoose.model("dealerEntry", DealerEntrySchema);

module.exports = DealerEntry;
// exports.default= dealerEntry;
