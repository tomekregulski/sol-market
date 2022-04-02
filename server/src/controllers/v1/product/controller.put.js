const Product = require('../../../models/v1/product');

module.exports = async (req, res, next) => {
  try {
    const filter = { _id: req.params };
    const update = { remaining_stock: req.body.remaining_stock };

    const product = await Product.findOneAndUpdate(req.params, update, {
      returnOriginal: false,
    });

    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
};
