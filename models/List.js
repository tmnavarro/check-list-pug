const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
  name: { type: String },
  description: { type: String },
  itens: [{
            itemRefe: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Item'
            },
            checked: { type: Boolean, default: false }
          }],
}, { timestamps: true });

const List = mongoose.model('List', listSchema);
module.exports = List;
