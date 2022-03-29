const { Schema, model } = require('mongoose');

const txSchema = new Schema(
  {
    wallet: String,
    productId: String,
    quantity: String,
    totalPrice: String,
  },
  { timestamps: true }
);

const TX = model('tx', txSchema);

module.exports = TX;
