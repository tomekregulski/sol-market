const { Schema, model } = require('mongoose');

const productSchema = new Schema(
  {
    name: String,
    image: String,
    description: String,
    price: Number,
    total_stock: Number,
    per_person: Number,
    deadline: Number,
    tx: [
      {
        type: Schema.Types.ObjectId,
        ref: 'tx',
      },
    ],
  },
  { timestamps: true }
);

const Product = model('product', productSchema);

module.exports = Product;
