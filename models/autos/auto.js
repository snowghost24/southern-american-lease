const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AutoEntrySchema = new Schema({
  vin: { type: String, unique : true, required: true },
  make: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  lastsix: { type: String, required: true },
  released: {type:String,default:'pending release'},
  price:{type: Number},
  doors:Number,
  textAreaValue: String,
  leatherColor:{type:String,default:'none'},
  liftrange:{type:String,default:'none'},
  detail:{type:String,default:'none'},
  miles:Number,
  location:String,
  
  trim:String,
  drivetrain:String,
  keyfeatures:String,
  liftdetails:String,
  
  bodywork:{type:String,default:'not required'},
  dentwork:{type:String,default:'not required'},
  bedliner:{type:String,default:'not required'},
  graphics:{type:String,default:'not required'},
  fuelType:String,
  series:String,
  color:String,
  bodyCabType:String,
  bodyClass:String,
  leatherStatus:String,
  liftStatus:String,
  detailStatus:String,
  liftNote:String,
  leatherNote:String,
  detailNote:String,
  transitLink:String,
  leatherHide:{type:Boolean,default:false},
  liftHide:{type:Boolean,default:false},
  detailHide:{type:Boolean,default:false},
  vinImage:String,
  vinConfirmed:{type:Boolean,default:false}, 
  inMarketCart:{type:Boolean,default:false},
  photoArray: [String],
  feature: [String],
  buyer:{type: mongoose.Schema.Types.ObjectId, ref: 'dealerEntry'},
  sold:{type:Boolean,default:false},
  date: { type: Date, default: Date.now }

});

const AutoEntry = mongoose.model("AutoEntry", AutoEntrySchema);

module.exports = AutoEntry;
