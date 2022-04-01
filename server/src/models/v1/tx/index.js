const { Schema, model } = require('mongoose');

const txSchema = new Schema(
  {
    wallet: String,
    user_id: Number,
    quantity: Number,
    totalSpent: Number,
    txHash: String,
    product_id: {
      type: Schema.Types.ObjectId,
      ref: 'product',
    },
  },
  { timestamps: true }
);

const TX = model('marketTx', txSchema);

module.exports = TX;
