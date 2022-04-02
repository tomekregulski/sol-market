const Product = require('../../../models/v1/product');

module.exports = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updated_stock = { remaining_stock: req.body.remaining_stock };

    const product = await Product.findOneAndUpdate(id, updated_stock, {
      returnOriginal: false,
    });

    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
};
