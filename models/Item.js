const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: { type: String },
  urlImg: { type: String },
  descption: { type: String },
  price: { type: Number },
}, { timestamps: true });

const Item = mongoose.model('Item', itemSchema);
module.exports = Item;
