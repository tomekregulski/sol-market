const { Schema, model } = require('mongoose');

const productSchema = new Schema(
  {
    name: String,
    image: String,
    description: String,
    price: Number,
    remaining_stock: Number,
    per_person: Number,
    deadline: Number,
  },
  { timestamps: true }
);

const Product = model('product', productSchema);

module.exports = Product;
