const mongoose = require('mongoose');

const columnSchema = new mongoose.Schema({
  columnId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  cardIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Card' }],
  order: { type: Number, required: true }
});

module.exports = mongoose.model('Column', columnSchema);