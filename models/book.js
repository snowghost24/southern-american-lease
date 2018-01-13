const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AutoEntrySchema = new Schema({
  vin: { type: String, unique : true, required: true },
  make: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  lastsix: { type: String, required: true },
  released: { type: String},
  price:{type: Number},
  doors:Number,
  textAreaValue: String,
  leatherColor:String,
  miles:Number,
  location:String,
  liftrange:String,
  trim:String,
  drivetrain:String,
  keyfeatures:String,
  liftdetails:String,
  detail:String,
  bodywork:String,
  dentwork:String,
  bedliner:String,
  fuelType:String,
  series:String,
  color:String,
  liftNote:String,
  leatherNote:String,
  detailNote:String,
  bodyShopNote:String,
  bodyCabType:String,
  bodyClass:String,
  leatherStatus:String,
  liftStatus:String,
  detailStatus:String,
  bodyShopStatus:String,
  date: { type: Date, default: Date.now }

});

const AutoEntry = mongoose.model("AutoEntry", AutoEntrySchema);

module.exports = AutoEntry;
