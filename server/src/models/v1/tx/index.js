const { Schema, model } = require('mongoose');

const txSchema = new Schema(
  {
    wallet: String,
    productId: String,
    quantity: Number,
    totalSpent: Number,
  },
  { timestamps: true }
);

const TX = model('tx', txSchema);

module.exports = TX;
