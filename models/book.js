const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  vin: { type: String, unique : true, required: true },
  make: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  synopsis: String,
  date: { type: Date, default: Date.now }
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
