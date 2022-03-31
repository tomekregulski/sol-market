const Product = require('../../../models/v1/product');

module.exports = {
  all: async (req, res, next) => {
    try {
      const data = await Product.find();

      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  },
};
