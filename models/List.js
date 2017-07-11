const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
  name: { type: String },
  itens: [{
            itemRefe: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Item'
            },
            checked: { type: Boolean, default: false },
            qtd: { type: Number, default: 1 },
          }],
}, { timestamps: true });

const List = mongoose.model('List', listSchema);
module.exports = List;
