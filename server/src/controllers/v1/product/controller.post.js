const Product = require('../../../models/v1/product');

module.exports = async (req, res, next) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();

    res.status(201).json(newProduct);
  } catch (err) {
    next(err);
  }
};
