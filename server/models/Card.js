const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' }
}, { timestamps: true });

module.exports = mongoose.model('Card', cardSchema);