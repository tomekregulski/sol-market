const { Schema, model } = require('mongoose');

const txSchema = new Schema(
  {
    wallet: String,
    user_id: Number,
    quantity: Number,
    product_id: String,
    totalSpent: Number,
    txHash: String,
    product: {
      type: Schema.Types.ObjectId,
      ref: 'product',
    },
  },
  { timestamps: true }
);

const TX = model('tx', txSchema);

module.exports = TX;
