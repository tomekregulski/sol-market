const Product = require('../../../models/v1/product');

module.exports = async (req, res, next) => {
  try {
    const filter = { _id: req.params };
    const update = req.body;
    console.log(update);
    const product = await Product.findByIdAndUpdate(req.params, update, {
      returnOriginal: false,
    });

    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
};
